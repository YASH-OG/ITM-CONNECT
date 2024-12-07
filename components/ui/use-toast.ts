import { Toast, ToasterToast } from "@/components/ui/toast"
import { useToast as useToastBase } from "@/components/ui/toast"

export const useToast = () => {
  const { toast, ...rest } = useToastBase()

  return {
    toast: (props: Toast) => {
      toast(props)
    },
    ...rest,
  }
}

export type { Toast, ToasterToast }