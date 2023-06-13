import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUser } from '../../../api'
import { queryKeys } from '../queryKeys'
import { useAuthContext } from '../../../contexts/auth'
import { handleRequestError } from '../../../utils/notifications'
import { toUserDTO } from '../mappers'

export const useUpdateUser = (onSuccess) => {
  const { logger } = useAuthContext()
  const id = logger?.id || ''

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation((data) => updateUser(id, data), {
    mutationKey: [queryKeys.updateUser, id],
    enabled: !!id,
    onError: handleRequestError,
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.getUsers])
      onSuccess?.()
    },
  })

  return {
    updateTheme: (theme) => mutate({ theme }),
    updateLanguage: (language) => mutate({ language }),
    updateUser: (user) => mutate(toUserDTO(user)),
    isLoading,
  }
}
