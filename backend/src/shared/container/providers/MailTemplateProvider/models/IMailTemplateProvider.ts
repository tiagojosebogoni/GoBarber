import IParseMailTemplate from '../dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
  parser(data: IParseMailTemplate): Promise<string>;
}
