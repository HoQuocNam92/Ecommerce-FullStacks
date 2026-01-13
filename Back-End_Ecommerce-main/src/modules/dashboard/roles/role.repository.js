import db from '#db';

export const createRole = async (data) => {
    const { name, description, permissionIds } = data;
    const pool = await db();
    const transaction = await pool.transaction();
    await transaction.begin();
    try {
        const role_id = await transaction.request()
            .input('name', name)
            .input('description', description)
            .query(`
            INSERT INTO roles (name, description)
            VALUES (@name, @description);select  SCOPE_IDENTITY() as id;
        `);
        for (let p of permissionIds) {
            await transaction.request()
                .input('role_id', role_id.recordset[0].id)
                .input('permission_id', p)
                .query(`INSERT INTO role_permissions values (@role_id, @permission_id)`);
        }

        await transaction.commit();
        return role_id
    } catch (error) {
        await transaction.rollback()
        throw error;
    }


};

export const getAllRole = async () => {
    const pool = await db();

    const result = await pool.request().query(`
        SELECT 
            r.id   AS role_id,
            r.name AS role_name,
            r.description AS role_description,

            p.id   AS permission_id,
            p.name AS permission_name,
            p.description AS permission_description
        FROM roles r
        JOIN role_permissions rp ON rp.role_id = r.id
        JOIN permissions p ON p.id = rp.permission_id
        ORDER BY r.id
    `);

    const rolesMap = {};

    for (const row of result.recordset) {
        if (!rolesMap[row.role_id]) {
            rolesMap[row.role_id] = {
                id: row.role_id,
                name: row.role_name,
                description: row.role_description,
                permissions: []
            };
        }

        rolesMap[row.role_id].permissions.push({
            id: row.permission_id,
            name: row.permission_name,
            description: row.permission_description
        });
    }

    return Object.values(rolesMap);
};


export const updateRole = async (id, data) => {
    const { name, description, permissionIds } = data;
    const pool = await db();

    const transaction = await pool.transaction()
    await transaction.begin()

    try {
        await transaction.request()
            .input('id', id)
            .input('name', name)
            .input('description', description)
            .query(`
            UPDATE roles
            SET name = @name,
                description = @description
            WHERE id = @id
        `);
        await transaction.request()
            .input('role_id', id)
            .query('delete from role_permissions where role_id = @role_id')
        for (let p of permissionIds) {
            await transaction.request()
                .input('role_id', id)
                .input('permission_id', p)
                .query(`INSERT INTO role_permissions values (@role_id, @permission_id)`);
        }

        await transaction.commit()
    } catch (error) {
        await transaction.rollback()
        throw error;
    }
};


export const deleteRole = async (id) => {
    const pool = await db();
    const transaction = pool.transaction();

    await transaction.begin();

    try {
        await transaction.request()
            .input('id', id)
            .query(`DELETE FROM role_permissions WHERE role_id = @id`);

        const result = await transaction.request()
            .input('id', id)
            .query(`DELETE FROM roles WHERE id = @id`);

        await transaction.commit();
        return result.rowsAffected[0] > 0;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};
