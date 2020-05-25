import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parser(): Promise<string> {
    return 'Mail content';
  }
}

export default FakeMailTemplateProvider;
