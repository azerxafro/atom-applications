export function showMessage(element: HTMLElement, success: boolean, message: string) {
  element.classList.remove('hidden');
  element.className = `text-center p-4 rounded-lg ${
    success ? 'bg-green-500/20' : 'bg-red-500/20'
  } text-white`;
  element.textContent = message;
}