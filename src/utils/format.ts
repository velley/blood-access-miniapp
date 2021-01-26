export const timeToString = (stamp: string) => {
  const formatStamp = parseInt(stamp);
  return new Date(formatStamp).toLocaleString()
}