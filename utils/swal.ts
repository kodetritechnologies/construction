import Swal, { SweetAlertResult } from "sweetalert2";

interface ConfirmOptions {
  title?: string;
  text?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

export const confirmAction = async ({
  title = "Are you sure?",
  text = "You won't be able to revert this!",
  confirmButtonText = "Yes, do it!",
  cancelButtonText = "Cancel",
}: ConfirmOptions = {}): Promise<SweetAlertResult> => {
  return Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#C59B27", // Architectural Warm Gold
    cancelButtonColor: "#ef4444",
    confirmButtonText,
    cancelButtonText,
    background: "#181B1E",
    color: "#f8fafc",
  });
};

export const confirmDelete = async (
  text: string = "You won't be able to revert this deleted item!"
): Promise<SweetAlertResult> => {
  return confirmAction({
    title: "Are you sure?",
    text,
    confirmButtonText: "Yes, delete it!",
  });
};

export const showSuccessAlert = (
  title: string = "Success!",
  text: string = "Action completed successfully."
) => {
  return Swal.fire({
    title,
    text,
    icon: "success",
    background: "#181B1E",
    color: "#f8fafc",
    confirmButtonColor: "#C59B27",
  });
};

export const showErrorAlert = (
  title: string = "Error!",
  text: string = "Something went wrong."
) => {
  return Swal.fire({
    title,
    text,
    icon: "error",
    background: "#181B1E",
    color: "#f8fafc",
    confirmButtonColor: "#ef4444",
  });
};
