export default interface SubMenuItem {
  name: string;
  routePath: string;
  handleOnClick: (path: String) => void;
}
