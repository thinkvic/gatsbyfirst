// npm install --save gatsby-plugin-typography react-typography typography



import Typography from "typography"
import kirkhamTheme from "typography-theme-kirkham"
const typography = new Typography(kirkhamTheme)
export default typography
export const rhythm = typography.rhythm