export const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signOut(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};
