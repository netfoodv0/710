import React, { useState, useEffect } from 'react';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Modal,
  Select,
  TreeSelect,
  Upload,
  Switch,
  message,
  Checkbox,
  Divider,
  Space
} from 'antd';
import { UploadOutlined, PlusOutlined, TagsOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;

interface ModalCadastroProdutoProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (values: any) => void;
  loading?: boolean;
}

const categoriaOptions = [
  {
    value: 'bebidas',
    label: 'Bebidas',
    children: [
      { value: 'refrigerantes', label: 'Refrigerantes' },
      { value: 'sucos', label: 'Sucos' },
      { value: 'aguas', label: 'Águas' },
    ],
  },
  {
    value: 'comidas',
    label: 'Comidas',
    children: [
      { value: 'lanches', label: 'Lanches' },
      { value: 'pizzas', label: 'Pizzas' },
      { value: 'pratos', label: 'Pratos Principais' },
    ],
  },
  {
    value: 'sobremesas',
    label: 'Sobremesas',
    children: [
      { value: 'bolos', label: 'Bolos' },
      { value: 'sorvetes', label: 'Sorvetes' },
      { value: 'doces', label: 'Doces' },
    ],
  },
];

const statusOptions = [
  { value: 'ativo', label: 'Ativo' },
  { value: 'inativo', label: 'Inativo' },
  { value: 'em_falta', label: 'Em Falta' },
];

const treeData = [
  {
    title: 'Adicionais',
    value: 'adicionais',
    children: [
      { title: 'Queijo Extra', value: 'queijo_extra' },
      { title: 'Bacon', value: 'bacon' },
      { title: 'Ovo', value: 'ovo' },
      { title: 'Cebola Caramelizada', value: 'cebola_caramelizada' },
      { title: 'Molho Especial', value: 'molho_especial' },
    ],
  },
  {
    title: 'Bebidas Extras',
    value: 'bebidas_extras',
    children: [
      { title: 'Refrigerante', value: 'refrigerante' },
      { title: 'Suco Natural', value: 'suco_natural' },
      { title: 'Água', value: 'agua' },
    ],
  },
];

const getUploadProps = (setImagemPreview: (url: string | null) => void): UploadProps => ({
  name: 'file',
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  headers: {
    authorization: 'authorization-text',
  },
  beforeUpload: (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp' || file.type === 'image/avif';
    if (!isJpgOrPng) {
      message.error('Você só pode enviar arquivos JPG/PNG/WEBP/AVIF!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('A imagem deve ter menos de 2MB!');
    }
    if (isJpgOrPng && isLt2M) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagemPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
    return isJpgOrPng && isLt2M;
  },
  onChange(info) {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} arquivo enviado com sucesso.`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} falha no envio do arquivo.`);
    }
  },
});

const restricoesAlimentares = [
  { value: 'sem_origem_animal', label: 'Sem ingredientes de origem animal' },
  { value: 'sem_carne', label: 'Sem qualquer tipo de carne' },
  { value: 'sem_lactose', label: 'Sem lactose e derivados' },
  { value: 'sem_acucar', label: 'Livre de qualquer tipo de açúcar' },
  { value: 'organico', label: 'Cultivado sem agrotóxicos (Lei 10.831)' },
];

const caracteristicasBebidas = [
  { value: 'gelada', label: 'Servida diretamente da geladeira' },
  { value: 'alcoolica', label: 'Teor alcoólico de 0,5% a 54%' },
  { value: 'frutas_frescas', label: 'Bebida preparada com frutas frescas' },
];

const unidadesMedida = [
  { value: 'g', label: 'g' },
  { value: 'kg', label: 'kg' },
  { value: 'ml', label: 'ml' },
  { value: 'l', label: 'l' },
  { value: 'un', label: 'un' },
  { value: 'cm', label: 'cm' },
];

export const ModalCadastroProdutoAntd: React.FC<ModalCadastroProdutoProps> = ({
  isOpen,
  onClose,
  onSave,
  loading = false
}) => {
  const [form] = Form.useForm();
  const [classificacoesForm] = Form.useForm();
  const [isClassificacoesModalOpen, setIsClassificacoesModalOpen] = useState(false);
  const [classificacoesSelecionadas, setClassificacoesSelecionadas] = useState<string[]>([]);
  const [imagemPreview, setImagemPreview] = useState<string | null>(null);
  const [adicionaisSelecionados, setAdicionaisSelecionados] = useState<string[]>([]);
  const unidadeSelecionada = Form.useWatch('unidadePorcao', form);

  const getLabelUnidade = () => {
    switch (unidadeSelecionada) {
      case 'g':
      case 'kg':
        return 'Peso da porção';
      case 'ml':
      case 'l':
        return 'Volume da porção';
      case 'cm':
        return 'Tamanho da porção';
      case 'un':
        return 'Quantidade da porção';
      default:
        return 'Tamanho da porção';
    }
  };

  const getClassificacoesLabels = () => {
    const restricoes = classificacoesForm.getFieldValue('restricoesAlimentares') || [];
    const bebidas = classificacoesForm.getFieldValue('caracteristicasBebidas') || [];
    return [...restricoes, ...bebidas];
  };

  useEffect(() => {
    if (!isClassificacoesModalOpen) {
      const todasClassificacoes = getClassificacoesLabels();
      setClassificacoesSelecionadas(todasClassificacoes);
    }
  }, [isClassificacoesModalOpen, classificacoesSelecionadas]);

  const handleSubmit = async (values: any) => {
    try {
      console.log('Valores do formulário:', values);
      if (onSave) {
        await onSave(values);
      }
      message.success('Produto cadastrado com sucesso!');
      form.resetFields();
      onClose();
    } catch (error) {
      message.error('Erro ao cadastrar produto!');
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Cadastro de Produto"
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      width={600}
      height="100vh"
      destroyOnClose
      closable={true}
      keyboard={true}
      centered
      style={{
        margin: 0,
        maxWidth: 'none'
      }}
      styles={{
        body: {
          maxHeight: '80vh',
          overflow: 'auto',
          padding: '24px 0px',
          paddingBottom: '130px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      }}
      transitionName="slide-right"
      maskClosable={true}
    >
      <Form
        form={form}
        variant="filled"
        onFinish={handleSubmit}
        initialValues={{ 
          status: 'ativo',
          disponivel: true
        }}
        layout="vertical"
        style={{ padding: '0' }}
      >
        <div className="space-y-2">
          <Form.Item 
            label="Nome do Produto" 
            name="nome" 
            rules={[{ required: true, message: 'Por favor, insira o nome do produto!' }]}
          >
            <Input placeholder="Ex: Pizza Margherita" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Preço"
              name="preco"
              rules={[{ required: true, message: 'Por favor, insira o preço!' }]}
            >
              <InputNumber
                placeholder="0,00"
                min={0}
                step={0.01}
                style={{ width: '100%' }}
                addonBefore="R$"
              />
            </Form.Item>

            <Form.Item
              label="Categoria"
              name="categoria"
              rules={[{ required: true, message: 'Por favor, selecione a categoria!' }]}
            >
              <Cascader
                options={categoriaOptions}
                placeholder="Selecione a categoria"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </div>

          <Form.Item
            label="Status"
            name="status"
          >
            <Select placeholder="Selecione o status">
              {statusOptions.map(status => (
                <Option key={status.value} value={status.value}>
                  {status.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Calorias"
            name="calorias"
          >
            <InputNumber
              placeholder="250"
              min={0}
              style={{ width: '100%' }}
              addonAfter="kcal"
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Disponível"
              name="disponivel"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              label="Produto em Destaque"
              name="destaque"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Tamanho da porção"
              name="tamanhoPorcao"
            >
              <InputNumber
                placeholder="500"
                min={0}
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item
              label={getLabelUnidade()}
              name="unidadePorcao"
            >
              <Select placeholder="l">
                {unidadesMedida.map(unidade => (
                  <Option key={unidade.value} value={unidade.value}>
                    {unidade.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            label="Serve até"
            name="servePessoas"
          >
            <InputNumber
              placeholder="4"
              min={1}
              style={{ width: '100%' }}
              addonAfter="pessoas"
            />
          </Form.Item>

          <Form.Item
            label="Descrição"
            name="descricao"
            rules={[{ required: true, message: 'Por favor, insira a descrição!' }]}
          >
            <TextArea 
              rows={4} 
              placeholder="Descreva o produto..."
            />
          </Form.Item>

          <Form.Item
            label="Adicionais"
            name="adicionais"
          >
            <div>
              <TreeSelect
                treeData={treeData}
                placeholder="Selecione os adicionais"
                multiple
                treeCheckable
                showCheckedStrategy={TreeSelect.SHOW_PARENT}
                style={{ width: '100%' }}
                value={adicionaisSelecionados}
                onChange={(value) => {
                  if (value.length <= 5) {
                    setAdicionaisSelecionados(value);
                  } else {
                    message.warning('Você pode selecionar no máximo 5 adicionais!');
                  }
                }}
              />
              {adicionaisSelecionados.length > 0 && (
                <div style={{ marginTop: 8, fontSize: '12px', color: '#666' }}>
                  {adicionaisSelecionados.length}/5 adicionais selecionados
                </div>
              )}
            </div>
          </Form.Item>

          <Form.Item
            label="Período de Disponibilidade"
            name="periodoDisponibilidade"
          >
            <RangePicker 
              style={{ width: '100%' }}
              placeholder={['Data início', 'Data fim']}
            />
          </Form.Item>

          <Form.Item
            label="Observações"
            name="observacoes"
          >
            <Mentions
              placeholder="Digite observações especiais..."
              rows={3}
            />
          </Form.Item>

          <Form.Item
            label="Imagem do Produto"
            name="imagem"
          >
            <div>
              <Upload {...getUploadProps(setImagemPreview)}>
                <Button icon={<UploadOutlined />}>Clique para enviar</Button>
              </Upload>
              {imagemPreview && (
                <div style={{ marginTop: 16 }}>
                  <img 
                    src={imagemPreview} 
                    alt="Preview" 
                    style={{ 
                      width: '200px', 
                      height: '200px', 
                      objectFit: 'cover', 
                      borderRadius: '8px',
                      border: '1px solid #d9d9d9'
                    }} 
                  />
                  <div style={{ marginTop: 8 }}>
                    <Button 
                      size="small" 
                      onClick={() => setImagemPreview(null)}
                      danger
                    >
                      Remover imagem
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Form.Item>

          <Form.Item
            label="Classificações"
          >
            <div className="space-y-2">
              <Button 
                type="dashed" 
                icon={<TagsOutlined />}
                onClick={() => setIsClassificacoesModalOpen(true)}
                block
              >
                Gerenciar Classificações
              </Button>
              {classificacoesSelecionadas.length > 0 && (
                <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded border">
                  <strong>Selecionadas:</strong>
                  <div className="mt-1">
                    {getClassificacoesLabels().map((label, index) => (
                      <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1 mb-1">
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t">
          <Button 
            onClick={handleCancel} 
            size="large"
            style={{ width: '100%' }}
          >
            Cancelar
          </Button>
          <Button 
            type="primary" 
            htmlType="submit"
            loading={loading}
            icon={<PlusOutlined />}
            size="large"
            style={{ width: '100%' }}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </Form>

      <Modal
        title="Classificações do Produto"
        open={isClassificacoesModalOpen}
        onCancel={() => setIsClassificacoesModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsClassificacoesModalOpen(false)}>
            Cancelar
          </Button>,
          <Button 
            key="save" 
            type="primary" 
            onClick={() => {
              const restricoes = classificacoesForm.getFieldValue('restricoesAlimentares') || [];
              const bebidas = classificacoesForm.getFieldValue('caracteristicasBebidas') || [];
              const todasClassificacoes = [...restricoes, ...bebidas];
              setClassificacoesSelecionadas(todasClassificacoes);
              setIsClassificacoesModalOpen(false);
              message.success('Classificações salvas com sucesso!');
            }}
          >
            Salvar Classificações
          </Button>,
        ]}
        width={600}
        destroyOnClose
      >
        <Form form={classificacoesForm} layout="vertical">
          <div className="space-y-6">
            <div>
              <p className="text-gray-600 mb-4">
                Selecione as características que se aplicam a este produto para ajudar seus clientes com preferências específicas.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3 text-gray-700">
                Restrições Alimentares
              </h4>
              <Form.Item name="restricoesAlimentares">
                <Checkbox.Group>
                  <Space direction="vertical" size="middle">
                    {restricoesAlimentares.map(restricao => (
                      <Checkbox key={restricao.value} value={restricao.value}>
                        {restricao.label}
                      </Checkbox>
                    ))}
                  </Space>
                </Checkbox.Group>
              </Form.Item>
            </div>

            <Divider />

            <div>
              <h4 className="text-lg font-semibold mb-3 text-gray-700">
                Para Bebidas
              </h4>
              <Form.Item name="caracteristicasBebidas">
                <Checkbox.Group>
                  <Space direction="vertical" size="middle">
                    {caracteristicasBebidas.map(caracteristica => (
                      <Checkbox key={caracteristica.value} value={caracteristica.value}>
                        {caracteristica.label}
                      </Checkbox>
                    ))}
                  </Space>
                </Checkbox.Group>
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </Modal>
  );
};

export default ModalCadastroProdutoAntd;