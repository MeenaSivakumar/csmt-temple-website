export interface ApiResponse<T> {
  success: boolean
  data: T
  actionAt: string
  actionBy?: { id: string; name: string }
}
