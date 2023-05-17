export default function getDate(value) {
  var date = new Date(value);

  var d = date.getDate();
  var m = date.getMonth() + 1;
  var y = date.getFullYear();

  var dateString =
    y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);
  return dateString;
}
