const camelCaseToSentence = (camelCaseString: string) => {
  const stringWithSpaces = camelCaseString.replace(/([A-Z])/g, " $1");

  return `${stringWithSpaces[0].toUpperCase()}${stringWithSpaces.slice(1)}`;
};

export default camelCaseToSentence;
