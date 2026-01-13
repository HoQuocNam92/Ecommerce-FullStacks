import { toast } from "sonner";

const toastConfirm = (name = "", title = "", data = null, fn) => {

    toast(`Xóa ${name} ${title}`, {
        description: "Hành động này không thể hoàn tác",
        action: {
            label: "Xác nhận",
            onClick: async () => {
                try {
                    await fn.mutateAsync(data)
                    toast.success("Xóa thành công ");
                } catch (error) {
                    toast.error(error?.message)
                }
            }
        },
        cancel: {
            label: "Hủy"
        }
    })

}
export default toastConfirm;