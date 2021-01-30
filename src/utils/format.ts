function add0(m){return m<10?'0'+m:m }

export const timeToString = (stamp: string) => {
  const formatStamp = parseInt(stamp);
  // return new Date(formatStamp).toLocaleString()
  var time = new Date(formatStamp);
  var y = time.getFullYear();
  var m = time.getMonth()+1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
}