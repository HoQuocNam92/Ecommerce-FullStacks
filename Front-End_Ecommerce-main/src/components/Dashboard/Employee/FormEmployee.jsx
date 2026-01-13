import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { staffSchema } from '@/schema/staffSchema'

import {
    Button,
    Input,
    Label,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
const FormEmployee = ({ employee, setIsOpen, updateEmployee, createEmployee }) => {
    const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm(
        { defaultValues: { ...employee, role_id: employee?.role_id.toString() }, resolver: yupResolver(staffSchema) }
    )
    const [isCreate, setIsCreate] = useState(false);
    const onsubmit = async (data) => {
        if (!(data?.avatar instanceof File)) {
            delete data.avatar
        }
        let res;
        if (isCreate) {
            res = await createEmployee.mutateAsync(data)
        }
        else {
            res = await updateEmployee.mutateAsync(data)
        }
        try {
            if (res.success) {
                setIsOpen(false)
            }
        } catch (error) {
            toast.error("Lỗi khi cập nhật" + error.message)

        }

    }
    const [img, setImg] = useState(null)

    useEffect(() => {
        if (!employee) {

            setIsCreate(true)
        }
        return () => img && URL.revokeObjectURL(img)

    }, [employee])
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-2xl rounded-2xl bg-background shadow-xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <div>
                        <h2 className="text-lg font-semibold">Chỉnh sửa nhân viên</h2>
                        <p className="text-sm text-muted-foreground">
                            Cập nhật thông tin và phân quyền
                        </p>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(false)}
                    >
                        ✕
                    </Button>
                </div>

                <form onSubmit={handleSubmit(onsubmit)} encType='multipart/form-data' className="space-y-6 p-6">

                    <div className="flex items-center gap-5">
                        <img
                            src={img ?? employee?.avatar}
                            className="h-24 w-24 rounded-full object-cover border"
                            alt="avatar"
                        />

                        <Label className="cursor-pointer">
                            <Controller name="avatar" control={control} render={({ field }) => (
                                <>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0]
                                            field.onChange(file)
                                            setImg(URL.createObjectURL(file))
                                        }}
                                    />
                                    <span className="rounded-md border px-4 py-2 text-sm hover:bg-muted">
                                        Đổi ảnh đại diện
                                    </span>
                                    {errors.avatar && <p className='text-red-700'>
                                        {errors.avatar.message}
                                    </p>}
                                </>
                            )} />


                        </Label>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Tên nhân viên">
                            <Input type="text"  {...register("name", { required: "Tên bắt buộc" })} />
                            {errors.name && <p className='text-red-700'>
                                {errors.name.message}
                            </p>}
                        </Field>

                        <Field label="Email">
                            <Input type="email" {...register("email", { required: "Email bắt buộc" })} />
                            {errors.email && <p className='text-red-700'>{errors.email.message}</p>}
                        </Field>

                        <Field label="Số điện thoại">
                            <Input {...register("phone")} />
                            {errors.phone && <p className='text-red-700'>{errors.phone.message}</p>}
                        </Field>

                        <Field label="Ngày sinh">
                            <Input type="date" {...register("birth")} />
                            {errors.birth && <p className='text-red-700'>{errors.birth.message}</p>}
                        </Field>
                        <Field label="Giới tính">
                            <Controller
                                name="gender"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Chọn giới tính" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="nam">Nam</SelectItem>
                                                <SelectItem value="nữ">Nữ</SelectItem>
                                                <SelectItem value="khác">Khác</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.gender && (
                                            <p className="text-red-700 text-sm">{errors.gender.message}</p>
                                        )}
                                    </>
                                )}
                            />
                        </Field>


                        <Field label="Trạng thái">
                            <Controller
                                name="status"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Chọn trạng thái" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="active">Hoạt động</SelectItem>
                                                <SelectItem value="lock">Khoá</SelectItem>

                                            </SelectContent>
                                        </Select>
                                        {errors.status && (
                                            <p className="text-red-700 text-sm">{errors.status.message}</p>
                                        )}
                                    </>
                                )}
                            />
                        </Field>

                    </div>

                    <Field label="Vai trò">
                        <Controller
                            name="role_id"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <Select
                                        value={field.value}
                                        onValueChange={(value) => field.onChange(value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Chọn vai trò" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">Khách hàng</SelectItem>
                                            <SelectItem value="4">Nhân viên</SelectItem>
                                            <SelectItem value="3">Quản lý</SelectItem>
                                            <SelectItem value="2">Admin</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    {errors.role_id && (
                                        <p className="text-red-700 text-sm">
                                            {errors.role_id.message}
                                        </p>
                                    )}
                                </>
                            )}
                        />
                    </Field>



                    {/* Actions */}
                    <div className="flex justify-end gap-3 border-t pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                        >
                            Huỷ
                        </Button>

                        <Button type="submit"  >
                            {isSubmitting ? 'Đang lưu...' : 'Lưu thay đổi'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const Field = ({ label, children }) => (
    <div className="space-y-1">
        <Label>{label}</Label>
        {children}
    </div>
)

export default FormEmployee
