import React, { useEffect, useState } from "react"
import { Input, Button, Switch, Label } from "@/components/ui"
import compressImage from "@/utils/compressImage";
import { toast } from "sonner";
import dayjs from "dayjs";

const BannerForm = ({ banner, createBanner, onSuccess, updateBanner }) => {

    const [img, setImg] = useState(null);
    const [edit, setEdit] = useState(false);
    const [form, setForm] = useState({
        id: "",
        title: "",
        link_url: "",
        image_url: "",
        is_active: "",
        start_date: "",
        end_date: ""
    })


    useEffect(() => {
        if (banner) {
            setEdit(true)
            setForm(banner)
        }
    }, [banner])

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleFile = (e) => {
        const imgFile = e.target.files[0];
        const imgPreview = URL.createObjectURL(imgFile)
        setImg(imgFile);
        setForm((prev) => ({ ...prev, image_url: imgPreview }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let imgCompression = "";
            if (img) {
                imgCompression = await compressImage(img);
            }
            if (edit) {

                await updateBanner.mutateAsync({ ...form, image_new: imgCompression })
                toast.success("Cập nhật banner thành công")
            }
            else {
                await createBanner.mutateAsync({ ...form, image: imgCompression })
                toast.success("Thêm banner thành công")

            }
            onSuccess()
        } catch (error) {
            toast.error(error?.message)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
            <div>
                <Label>Tiêu đề</Label>
                <Input name="title" value={form.title} onChange={handleChange} />
            </div>

            <div>
                <Label>Link URL</Label>
                <Input name="link_url" value={form.link_url} onChange={handleChange} />
            </div>

            <div>
                <Label>Image  </Label>
                <img className="w-full" src={form?.image_url} alt="" />
                <input type="file" name="image_url" onChange={handleFile} />

            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label>Start date</Label>
                    <Input type="date" name="start_date" value={dayjs(form.start_date).format("YYYY-MM-DD")} onChange={handleChange} />
                </div>

                <div>
                    <Label>End date</Label>
                    <Input type="date" name="end_date" value={dayjs(form.end_date).format("YYYY-MM-DD")} onChange={handleChange} />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Switch
                    checked={form.is_active}
                    onCheckedChange={(v) => setForm({ ...form, is_active: v })}
                    className="
                    data-[state=checked]:bg-orange-600
                    data-[state=unchecked]:bg-gray-300
                    "
                />
                <Label>Kích hoạt banner</Label>
            </div>


            <Button type="submit" className="w-full">
                {!createBanner.isPending ? "Lưu banner" : "Đang lưu..."}
            </Button>
        </form>
    )
}

export default BannerForm
