import React from 'react';
import { User, Phone, Mail, Download } from 'lucide-react';

interface ContactMessageProps {
  vcard: any[];
  body?: string;
}

export const ContactMessage: React.FC<ContactMessageProps> = ({ vcard, body }) => {
  if (!vcard || vcard.length === 0) {
    return (
      <div className="text-sm text-gray-400">
        Contato não disponível
      </div>
    );
  }

  const contact = vcard[0]; // Primeiro contato do vCard

  const parseVCard = (vcardData: any) => {
    // Extrair informações do vCard
    const name = contact.displayName || contact.formattedName || 'Contato';
    const phones = contact.phoneNumbers || [];
    const emails = contact.emails || [];
    const organization = contact.organization || '';
    
    return {
      name,
      phones,
      emails,
      organization
    };
  };

  const contactInfo = parseVCard(contact);

  const handleAddContact = () => {
    // Criar vCard para download
    let vcardContent = 'BEGIN:VCARD\nVERSION:3.0\n';
    vcardContent += `FN:${contactInfo.name}\n`;
    
    if (contactInfo.organization) {
      vcardContent += `ORG:${contactInfo.organization}\n`;
    }
    
    contactInfo.phones.forEach((phone: any) => {
      vcardContent += `TEL:${phone.number}\n`;
    });
    
    contactInfo.emails.forEach((email: any) => {
      vcardContent += `EMAIL:${email.address}\n`;
    });
    
    vcardContent += 'END:VCARD';

    const blob = new Blob([vcardContent], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${contactInfo.name}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCallPhone = (phoneNumber: string) => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const handleSendEmail = (emailAddress: string) => {
    window.open(`mailto:${emailAddress}`, '_self');
  };

  return (
    <div className="min-w-[250px] max-w-sm">
      <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-600/30">
        {/* Header do contato */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-gray-300" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-white">
              {contactInfo.name}
            </div>
            {contactInfo.organization && (
              <div className="text-xs text-gray-400">
                {contactInfo.organization}
              </div>
            )}
          </div>
        </div>

        {/* Informações de contato */}
        <div className="space-y-2 mb-3">
          {contactInfo.phones.map((phone: any, index: number) => (
            <button
              key={index}
              onClick={() => handleCallPhone(phone.number)}
              className="flex items-center gap-2 w-full p-2 hover:bg-gray-700/50 rounded-lg transition-colors text-left"
            >
              <Phone className="w-3 h-3 text-green-500" />
              <div className="flex-1">
                <div className="text-sm text-white">{phone.number}</div>
                <div className="text-xs text-gray-400">{phone.type || 'Telefone'}</div>
              </div>
            </button>
          ))}

          {contactInfo.emails.map((email: any, index: number) => (
            <button
              key={index}
              onClick={() => handleSendEmail(email.address)}
              className="flex items-center gap-2 w-full p-2 hover:bg-gray-700/50 rounded-lg transition-colors text-left"
            >
              <Mail className="w-3 h-3 text-blue-500" />
              <div className="flex-1">
                <div className="text-sm text-white">{email.address}</div>
                <div className="text-xs text-gray-400">{email.type || 'Email'}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Botão para adicionar contato */}
        <button
          onClick={handleAddContact}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          <span className="text-sm">Adicionar Contato</span>
        </button>
      </div>

      {body && (
        <div className="mt-2 text-sm">
          {body}
        </div>
      )}
    </div>
  );
};
