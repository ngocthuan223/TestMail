export interface MailTemplate {
    id: number;
    mail_name: string;
    lang_key:string;
    subject: string;
    subject_nl: string;
    mail_template_en: string;
    mail_template_nl:string;
    footer: string;
    footer_nl: string; 
    footer_en: string;
  }

export interface MailRsTemplate extends MailTemplate {
    reseller_id: number;
  }