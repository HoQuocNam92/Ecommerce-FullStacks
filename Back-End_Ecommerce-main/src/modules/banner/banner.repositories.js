import db from "#db";



export const createBanner = async (data) => {

    const { title, link_url, img, start_date, end_date, is_active } = data;
    const pool = await db();
    const resutl = await pool.request()
        .input('title', title)
        .input('link_url', link_url)
        .input('image_url', img)
        .input('start_date', start_date)
        .input('end_date', end_date)
        .input('is_active', is_active == 'true' ? 1 : 0)
        .query("insert into banners  (title , link_url , image_url , is_active , start_date , end_date )values( @title,@link_url , @image_url , @is_active,@start_date,@end_date)")
    return resutl.rowsAffected[0] > 0;
}


export const getAllBanner = async (offset, page) => {
    const pool = await db();
    const resutl = await pool.request()
        .input("offset", offset)
        .input("page", page)
        .query(" Select count(*) over() as totalRecord ,  id , title , link_url , image_url , is_active , start_date , end_date from banners  order by id  offset  @offset row fetch next @page row ONLY")
    return resutl.recordset;
}

export const updateBanner = async (data, image) => {
    const { id, title, link_url, image_url, start_date, end_date, is_active } = data;
    const pool = await db();
    const resutl = await pool.request()
        .input('id', id)
        .input('title', title)
        .input('link_url', link_url)
        .input('image_url', image ?? image_url)
        .input('start_date', start_date)
        .input('end_date', end_date)
        .input('is_active', is_active == true ? 1 : 0)
        .query("update  banners  set title =@title , link_url=@link_url , image_url =@image_url, is_active =@is_active, start_date =@start_date , end_date =@end_date where id =@id ")


    return resutl.rowsAffected[0] > 0;
}

export const getImage = async (id) => {
    const pool = await db();
    const resutl = await pool.request()
        .input("id", id)
        .query(" Select image_url from banners where id = @id")
    return resutl.recordset[0];
}


export const deleteBanner = async (id) => {
    const pool = await db();
    const resutl = await pool.request()
        .input("id", id)
        .query("delete from banners where id = @id")
    return resutl.recordset;
}