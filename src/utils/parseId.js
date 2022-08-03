// Helper function to pull ID out of provided url
function parseId(string) {
  return string.replace(/[^0-9]/g, '')
};

export default parseId;