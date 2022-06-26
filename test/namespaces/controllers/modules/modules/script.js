const inner_script = () => alert('I am an inner module1.');
export { inner_script as inner_script1 };
const inner_script2 = () => alert('I am an inner module2.');
export default inner_script2;
