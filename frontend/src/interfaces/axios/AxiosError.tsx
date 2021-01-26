export interface AxiosError {
  message: string
  response: {
    data: {
      non_field_errors: string[]
    }
  }
}

export interface PasswordUpdateError {
  message: string
  response: {
    data: {
      new_password2: string[]
    }
  }
}