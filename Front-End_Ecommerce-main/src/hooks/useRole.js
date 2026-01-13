import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as RoleService from '@/services/RoleServices'

const useRole = () => {
    const queryClient = useQueryClient();


    const getRolesQuery = useQuery({
        queryKey: ['roles'],
        queryFn: async () => {
            const res = await RoleService.getAllRole();
            return res.data.data;
        }
    });


    const createRoleMutation = useMutation({
        mutationFn: async (data) => {
            const res = await RoleService.createRole(data);
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['roles']);
        }
    });


    const updateRoleMutation = useMutation({
        mutationFn: async ({ id, data }) => {
            const res = await RoleService.updateRole(id, data);
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['roles']);
        }
    });


    const deleteRoleMutation = useMutation({
        mutationFn: async (id) => {
            const res = await RoleService.deleteRole(id);
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['roles']);
        }
    });


    return {
        roles: getRolesQuery.data,
        error: getRolesQuery.error,
        loading: getRolesQuery.isLoading,

        createRole: createRoleMutation.mutate,
        updateRole: updateRoleMutation.mutate,
        deleteRole: deleteRoleMutation.mutate,

        isCreating: createRoleMutation.isPending,
        isUpdating: updateRoleMutation.isPending,
        isDeleting: deleteRoleMutation.isPending,
    };
};

export default useRole;
