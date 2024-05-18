class Modal {
  private isActive = false;
  private showMovieDetails = false;
  constructor() {}
  setIsActive = (a: boolean) => {
    this.isActive = a;
  };
  getIsActive = () => {
    return this.isActive;
  };
  setShowMovieDetails = (s: boolean) => {
    this.showMovieDetails = s;
  };
  getShowMovieDetails = () => {
    return this.showMovieDetails;
  };
}

const useModal = () => {
  const m = new Modal();
  return m;
};

export default useModal;
