const STORAGE_KEY = "quiz_state";
const QUIZ_STARTED_KEY = "quiz_started";

export const saveQuizState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save state to localStorage:", error);
  }
};

export const loadQuizState = () => {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    return savedState ? JSON.parse(savedState) : null;
  } catch (error) {
    console.error("Failed to load state from localStorage:", error);
    return null;
  }
};

export const clearQuizState = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear state from localStorage:", error);
  }
};

export const hasQuizStarted = () => {
  try {
    return localStorage.getItem(QUIZ_STARTED_KEY) === "true";
  } catch {
    return false;
  }
};

export const markQuizAsStarted = () => {
  try {
    localStorage.setItem(QUIZ_STARTED_KEY, "true");
  } catch (error) {
    console.error("Failed to mark quiz as started:", error);
  }
};

export const clearQuizStarted = () => {
  try {
    localStorage.removeItem(QUIZ_STARTED_KEY);
  } catch (error) {
    console.error("Failed to clear quiz started flag:", error);
  }
};
