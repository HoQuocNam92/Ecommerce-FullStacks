const Notification = {
    tableName: 'notifications',
    columns: {
        id: 'id',
        user_id: 'user_id',
        title: 'title',
        message: 'message',
        is_read: 'is_read',
        created_at: 'created_at'
    }
};

export default Notification;
