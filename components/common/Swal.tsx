import Swal from "sweetalert2";

export function infoAlert(title: string) {
  Swal.fire({
    title,
    icon: "info",
  });
}

export function successAlert(title: string) {
  return Swal.fire({
    icon: "success",
    title,
  });
}

export function errorAlert(errorMessage?: string) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text:
      errorMessage ||
      "Something went wrong! Please try again later. If the problem persists, please email us with a screenshot of the page.",
  });
}
