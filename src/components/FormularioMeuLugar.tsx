import { useState } from "react";
import { motion } from "framer-motion";
import { X, User, Mail, Phone, Calendar, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

interface FormularioMeuLugarProps {
  onClose: () => void;
}

const FormularioMeuLugar = ({ onClose }: FormularioMeuLugarProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    idade: "",
    dataConversao: "",
    mensagem: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = encodeURIComponent(
      `*NOVO CONVERTIDO - ENCONTRAR MEU LUGAR*\n\n` +
        `Nome: ${formData.nome}\n` +
        `Email: ${formData.email}\n` +
        `Telefone: ${formData.telefone}\n` +
        `Idade: ${formData.idade}\n` +
        `Data da Conversão: ${formData.dataConversao}\n` +
        `Mensagem: ${formData.mensagem}`,
    );

    window.open(`https://wa.me/5511999999999?text=${message}`, "_blank");
    onClose();
  };

  const nextStep = () => {
    if (step < 2) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card border-2 border-border rounded-3xl p-8 max-w-lg w-full shadow-glow relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="font-display text-3xl text-foreground mb-2">
            ENCONTRAR MEU LUGAR
          </h2>
          <p className="text-muted-foreground">
            Seja bem-vindo à família Incendiados!
          </p>

          {/* Progress Indicator */}
          <div className="flex gap-2 mt-4">
            <div
              className={`flex-1 h-1 rounded-full ${step >= 1 ? "bg-gradient-fire" : "bg-muted"}`}
            />
            <div
              className={`flex-1 h-1 rounded-full ${step >= 2 ? "bg-gradient-fire" : "bg-muted"}`}
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="nome" className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-primary" />
                  Nome Completo
                </Label>
                <Input
                  id="nome"
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) =>
                    setFormData({ ...formData, nome: e.target.value })
                  }
                  placeholder="Seu nome completo"
                  className="bg-background/50"
                />
              </div>

              <div>
                <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4 text-primary" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="seu@email.com"
                  className="bg-background/50"
                />
              </div>

              <div>
                <Label
                  htmlFor="telefone"
                  className="flex items-center gap-2 mb-2"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  Telefone (WhatsApp)
                </Label>
                <Input
                  id="telefone"
                  type="tel"
                  required
                  value={formData.telefone}
                  onChange={(e) =>
                    setFormData({ ...formData, telefone: e.target.value })
                  }
                  placeholder="(11) 99999-9999"
                  className="bg-background/50"
                />
              </div>

              <div>
                <Label htmlFor="idade" className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-primary" />
                  Idade
                </Label>
                <Input
                  id="idade"
                  type="number"
                  required
                  value={formData.idade}
                  onChange={(e) =>
                    setFormData({ ...formData, idade: e.target.value })
                  }
                  placeholder="Sua idade"
                  className="bg-background/50"
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <Label
                  htmlFor="dataConversao"
                  className="flex items-center gap-2 mb-2"
                >
                  <Calendar className="w-4 h-4 text-primary" />
                  Quando você aceitou Jesus?
                </Label>
                <Input
                  id="dataConversao"
                  type="text"
                  required
                  value={formData.dataConversao}
                  onChange={(e) =>
                    setFormData({ ...formData, dataConversao: e.target.value })
                  }
                  placeholder="Ex: Semana passada, mês passado..."
                  className="bg-background/50"
                />
              </div>

              <div>
                <Label
                  htmlFor="mensagem"
                  className="flex items-center gap-2 mb-2"
                >
                  <MessageSquare className="w-4 h-4 text-primary" />
                  Como podemos te ajudar?
                </Label>
                <Textarea
                  id="mensagem"
                  required
                  value={formData.mensagem}
                  onChange={(e) =>
                    setFormData({ ...formData, mensagem: e.target.value })
                  }
                  placeholder="Conte um pouco sobre sua jornada..."
                  className="bg-background/50 min-h-[120px]"
                />
              </div>
            </motion.div>
          )}

          <div className="flex gap-3 pt-4">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                className="flex-1"
              >
                Voltar
              </Button>
            )}
            {step < 2 ? (
              <Button
                type="button"
                onClick={nextStep}
                className="flex-1 bg-gradient-fire hover:opacity-90 text-white font-bold"
              >
                Próximo
              </Button>
            ) : (
              <Button
                type="submit"
                className="flex-1 bg-gradient-fire hover:opacity-90 text-white font-bold"
              >
                Enviar via WhatsApp
              </Button>
            )}
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default FormularioMeuLugar;
