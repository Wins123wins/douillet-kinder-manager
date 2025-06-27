
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ParentData = {
  name: string;
  phone: string;
  email: string;
  occupation: string;
  address: string;
};

type DocumentsData = {
  cinFather: boolean;
  cinMother: boolean;
  vaccination: boolean;
  photos: boolean;
  birthCert: boolean;
  signedRules: boolean;
};

type GardeData = {
  matin: boolean;
  dejeuner: boolean;
  mercredi: boolean;
  sortie: boolean;
};

type FormData = {
  childPhoto: File | null;
  childName: string;
  dateOfBirth: string;
  age: string;
  gender: string;
  level: string;
  father: ParentData;
  mother: ParentData;
  documents: DocumentsData;
  garde: GardeData;
  allergies: string;
  medications: string;
  emergencyName: string;
  emergencyPhone: string;
};

export const EnrollmentForm = () => {
  const [step, setStep] = useState(1);
  const [enrollmentDate, setEnrollmentDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    childPhoto: null,
    childName: "",
    dateOfBirth: "",
    age: "",
    gender: "",
    level: "",
    father: {
      name: "",
      phone: "",
      email: "",
      occupation: "",
      address: "",
    },
    mother: {
      name: "",
      phone: "",
      email: "",
      occupation: "",
      address: "",
    },
    documents: {
      cinFather: false,
      cinMother: false,
      vaccination: false,
      photos: false,
      birthCert: false,
      signedRules: false,
    },
    garde: {
      matin: false,
      dejeuner: false,
      mercredi: false,
      sortie: false,
    },
    allergies: "",
    medications: "",
    emergencyName: "",
    emergencyPhone: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setEnrollmentDate(today);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        setPreviewImage(imageUrl);
        setFormData(prev => ({ ...prev, childPhoto: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, section?: keyof FormData) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (section === "father" || section === "mother") {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section as "father" | "mother"],
          [name]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }

    if (name === "dateOfBirth") {
      calculateAgeAndLevel(value);
    }
  };

  const calculateAgeAndLevel = (dob: string) => {
    if (!dob) return;

    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    const months = (today.getMonth() + 12 - birthDate.getMonth()) % 12;
    const ageStr = `${age}y ${months}m`;
    
    let level = "";
    if (age === 2) level = "TPS";
    else if (age === 3) level = "PS";
    else if (age === 4) level = "MS";
    else if (age === 5) level = "GS";

    setFormData(prev => ({
      ...prev,
      age: ageStr,
      level,
    }));
  };

  const handleCheckboxChange = (section: keyof FormData, key: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...((prev[section] as Record<string, any>) || {}),
        [key]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Inscription terminée",
        description: `${formData.childName} a été inscrit avec succès le ${enrollmentDate}`,
      });
      
      navigate("/");
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Échec de l'inscription",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && (!formData.childName || !formData.dateOfBirth || !formData.gender)) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }
    if (step === 2 && (!formData.father.name || !formData.father.phone || !formData.mother.name || !formData.mother.phone)) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir toutes les informations des parents",
        variant: "destructive",
      });
      return;
    }
    if (step === 6 && (!formData.emergencyName || !formData.emergencyPhone)) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez fournir les détails du contact d'urgence",
        variant: "destructive",
      });
      return;
    }
    
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const stepTitles = [
    "Informations de l'enfant",
    "Informations des parents",
    "Documents requis",
    "Options de garde",
    "Informations de santé",
    "Contact d'urgence"
  ];

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex flex-col space-y-2">
          <CardTitle className="text-2xl flex justify-between items-center">
            <span>Formulaire d'inscription</span>
            <span className="text-sm text-gray-500">
              Date d'inscription: {enrollmentDate}
            </span>
          </CardTitle>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Étape {step} sur 6</span>
              <span>{stepTitles[step - 1]}</span>
            </div>
            <Progress value={(step / 6) * 100} className="h-2" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Informations de l'enfant</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Photo de l'enfant</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    {previewImage ? (
                      <div className="flex flex-col items-center">
                        <Avatar className="w-24 h-24 mb-2">
                          <AvatarImage src={previewImage} />
                          <AvatarFallback>
                            {formData.childName?.[0] || "E"}
                          </AvatarFallback>
                        </Avatar>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setPreviewImage(null);
                            setFormData(prev => ({ ...prev, childPhoto: null }));
                          }}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Supprimer la photo
                        </Button>
                      </div>
                    ) : (
                      <label htmlFor="photo-upload" className="cursor-pointer">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Cliquez pour télécharger une photo</p>
                        <p className="text-xs text-gray-500">JPG/PNG jusqu'à 10MB</p>
                      </label>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="childName">Nom complet de l'enfant *</Label>
                  <Input 
                    id="childName" 
                    name="childName" 
                    value={formData.childName} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date de naissance *</Label>
                  <Input 
                    id="dateOfBirth" 
                    type="date" 
                    name="dateOfBirth" 
                    value={formData.dateOfBirth} 
                    onChange={handleInputChange} 
                    max={new Date().toISOString().split('T')[0]}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Âge</Label>
                  <Input id="age" disabled value={formData.age} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Sexe *</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner le sexe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Garçon">Garçon</SelectItem>
                      <SelectItem value="Fille">Fille</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="level">Niveau</Label>
                  <Input id="level" disabled value={formData.level} />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Informations des parents</h2>
              {(['father', 'mother'] as const).map((role) => (
                <div key={role} className="space-y-4 p-4 border rounded-lg">
                  <h3 className="font-medium text-lg">
                    Informations du {role === 'father' ? 'père' : 'mère'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`${role}-name`}>Nom complet *</Label>
                      <Input
                        id={`${role}-name`}
                        name="name"
                        placeholder={`Nom complet du ${role === 'father' ? 'père' : 'mère'}`}
                        value={formData[role].name}
                        onChange={(e) => handleInputChange(e, role)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${role}-phone`}>Téléphone *</Label>
                      <Input
                        id={`${role}-phone`}
                        name="phone"
                        type="tel"
                        placeholder="Téléphone"
                        value={formData[role].phone}
                        onChange={(e) => handleInputChange(e, role)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${role}-email`}>Email</Label>
                      <Input
                        id={`${role}-email`}
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData[role].email}
                        onChange={(e) => handleInputChange(e, role)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${role}-occupation`}>Profession</Label>
                      <Input
                        id={`${role}-occupation`}
                        name="occupation"
                        placeholder="Profession"
                        value={formData[role].occupation}
                        onChange={(e) => handleInputChange(e, role)}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor={`${role}-address`}>Adresse</Label>
                      <Textarea
                        id={`${role}-address`}
                        name="address"
                        placeholder="Adresse"
                        value={formData[role].address}
                        onChange={(e) => handleInputChange(e, role)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Documents requis</h2>
              <p className="text-sm text-gray-600">
                Veuillez cocher tous les documents qui seront fournis
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(formData.documents).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2 p-2 border rounded">
                    <Checkbox
                      id={`doc-${key}`}
                      checked={!!value}
                      onCheckedChange={(v: boolean) => handleCheckboxChange("documents", key, v)}
                    />
                    <Label htmlFor={`doc-${key}`} className="cursor-pointer">
                      {key === 'cinFather' ? 'CIN du père' :
                       key === 'cinMother' ? 'CIN de la mère' :
                       key === 'vaccination' ? 'Carnet de vaccination' :
                       key === 'photos' ? 'Photos d\'identité' :
                       key === 'birthCert' ? 'Acte de naissance' :
                       'Règlement signé'}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Options de garde</h2>
              <p className="text-sm text-gray-600">
                Sélectionnez les options de garde nécessaires
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(formData.garde).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2 p-2 border rounded">
                    <Checkbox
                      id={`garde-${key}`}
                      checked={!!value}
                      onCheckedChange={(v: boolean) => handleCheckboxChange("garde", key, v)}
                    />
                    <Label htmlFor={`garde-${key}`} className="cursor-pointer">
                      {key === 'matin' ? 'Garde du matin' :
                       key === 'dejeuner' ? 'Garde déjeuner' :
                       key === 'mercredi' ? 'Garde mercredi' :
                       'Garde de sortie'}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Informations de santé</h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="allergies">Allergies</Label>
                  <Textarea
                    id="allergies"
                    name="allergies"
                    placeholder="Listez toutes les allergies de l'enfant"
                    value={formData.allergies}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="medications">Médicaments</Label>
                  <Textarea
                    id="medications"
                    name="medications"
                    placeholder="Listez tous les médicaments que prend l'enfant"
                    value={formData.medications}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Contact d'urgence</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyName">Nom du contact d'urgence *</Label>
                  <Input
                    id="emergencyName"
                    name="emergencyName"
                    placeholder="Nom complet"
                    value={formData.emergencyName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Téléphone d'urgence *</Label>
                  <Input
                    id="emergencyPhone"
                    name="emergencyPhone"
                    type="tel"
                    placeholder="Numéro de téléphone"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={prevStep}>
                Précédent
              </Button>
            ) : (
              <div />
            )}
            {step < 6 ? (
              <Button type="button" onClick={nextStep}>
                Suivant
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Envoi en cours..." : "Soumettre l'inscription"}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
