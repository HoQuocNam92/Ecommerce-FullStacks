import db from '../../shared/config/database.js';
import sql from 'mssql';

export const getAllRoles = async () => {
    const pool = await db();
    const result = await pool.request().query(`
        SELECT 
            r.id,
            r.name,
            r.description,
            COUNT(u.id) as user_count
        FROM roles r
        LEFT JOIN users u ON r.id = u.role_id
        GROUP BY r.id, r.name, r.description
        ORDER BY r.name ASC
    `);
    return result.recordset;
};

export const getRoleById = async (id) => {
    const pool = await db();
    const result = await pool.request()
        .input('id', sql.Int, id)
        .query(`
            SELECT 
                r.id,
                r.name,
                r.description,
                COUNT(u.id) as user_count
            FROM roles r
            LEFT JOIN users u ON r.id = u.role_id
            WHERE r.id = @id
            GROUP BY r.id, r.name, r.description
        `);
    return result.recordset[0];
};

export const createRole = async (data) => {
    const { name, description, permissions } = data;
    const pool = await db();

    // Create role
    const result = await pool.request()
        .input('name', sql.NVarChar, name)
        .input('description', sql.NVarChar, description || '')
        .query(`
            INSERT INTO roles (name, description)
            VALUES (@name, @description);
            SELECT SCOPE_IDENTITY() AS id
        `);

    const roleId = result.recordset[0].id;

    // Add permissions if provided
    if (permissions && permissions.length > 0) {
        for (const permissionId of permissions) {
            await pool.request()
                .input('role_id', sql.Int, roleId)
                .input('permission_id', sql.Int, permissionId)
                .query(`
                    INSERT INTO role_permissions (role_id, permission_id)
                    VALUES (@role_id, @permission_id)
                `);
        }
    }

    return { id: roleId, name, description };
};

export const updateRole = async (id, data) => {
    const { name, description } = data;
    const pool = await db();

    return pool.request()
        .input('id', sql.Int, id)
        .input('name', sql.NVarChar, name)
        .input('description', sql.NVarChar, description || '')
        .query(`
            UPDATE roles
            SET name = @name,
                description = @description
            WHERE id = @id
        `);
};

export const deleteRole = async (id) => {
    const pool = await db();

    // Delete role permissions first
    await pool.request()
        .input('role_id', sql.Int, id)
        .query('DELETE FROM role_permissions WHERE role_id = @role_id');

    // Delete role
    return pool.request()
        .input('id', sql.Int, id)
        .query('DELETE FROM roles WHERE id = @id');
};

export const checkRoleHasUsers = async (id) => {
    const pool = await db();
    const result = await pool.request()
        .input('role_id', sql.Int, id)
        .query('SELECT COUNT(*) as count FROM users WHERE role_id = @role_id');
    return result.recordset[0].count > 0;
};

export const getRolePermissions = async (id) => {
    const pool = await db();
    const result = await pool.request()
        .input('role_id', sql.Int, id)
        .query(`
            SELECT p.id, p.name, p.description
            FROM permissions p
            INNER JOIN role_permissions rp ON p.id = rp.permission_id
            WHERE rp.role_id = @role_id
            ORDER BY p.name ASC
        `);
    return result.recordset;
};

export const updateRolePermissions = async (id, permissions) => {
    const pool = await db();

    // Delete existing permissions
    await pool.request()
        .input('role_id', sql.Int, id)
        .query('DELETE FROM role_permissions WHERE role_id = @role_id');

    // Add new permissions
    if (permissions && permissions.length > 0) {
        for (const permissionId of permissions) {
            await pool.request()
                .input('role_id', sql.Int, id)
                .input('permission_id', sql.Int, permissionId)
                .query(`
                    INSERT INTO role_permissions (role_id, permission_id)
                    VALUES (@role_id, @permission_id)
                `);
        }
    }
};

