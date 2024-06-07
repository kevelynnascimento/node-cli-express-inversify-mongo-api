const getEntityTemplate = (databaseTableName: string, pascalCaseName: string): string => {
  return `
export class ${pascalCaseName}Entity {
  id: string;
  name: string;
  creationDate: Date;
  updateDate: Date;
  deactivationDate: Date;
}
`;
}

export { getEntityTemplate };