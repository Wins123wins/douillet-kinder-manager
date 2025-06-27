
import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Phone, Mail, Calendar, Heart, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Types for consistent data structure
type ParentInfo = {
  name: string;
  relationship: string;
  phone: string;
  email: string;
  occupation: string;
};

type EmergencyContact = {
  name: string;
  relationship: string;
  phone: string;
};

type HealthInfo = {
  allergies: string[];
  medications: string;
  conditions: string;
  dietaryRestrictions: string;
};

type EnrollmentInfo = {
  startDate: string;
  status: "Active" | "Inactive" | "Pending";
};

type DocumentsInfo = {
  cinFather: boolean;
  cinMother: boolean;
  vaccination: boolean;
  photos: boolean;
  birthCert: boolean;
  signedRules: boolean;
};

type GardeInfo = {
  matin: boolean;
  dejeuner: boolean;
  mercredi: boolean;
  sortie: boolean;
};

type ChildData = {
  id: number;
  name: string;
  age: string;
  gender: string;
  level: string;
  dateOfBirth: string;
  address: string;
  parent: ParentInfo;
  emergency: EmergencyContact;
  health: HealthInfo;
  enrollment: EnrollmentInfo;
  documents: DocumentsInfo;
  garde: GardeInfo;
};

const ChildProfile = () => {
  const childData: ChildData = {
    id: 1,
    name: "Emma Thompson",
    age: "4y 3m",
    gender: "Girl",
    level: "MS",
    dateOfBirth: "2020-03-15",
    address: "123 Maple Street, Springfield, IL 62701",
    parent: {
      name: "Sarah Thompson",
      relationship: "Mother",
      phone: "(555) 123-4567",
      email: "sarah.thompson@email.com",
      occupation: "Teacher",
    },
    emergency: {
      name: "John Thompson",
      relationship: "Father",
      phone: "(555) 987-6543",
    },
    health: {
      allergies: ["Peanuts", "Dairy"],
      medications: "None",
      conditions: "None",
      dietaryRestrictions: "Lactose-free meals",
    },
    enrollment: {
      startDate: "2023-09-01",
      status: "Active",
    },
    documents: {
      cinFather: true,
      cinMother: true,
      vaccination: true,
      photos: true,
      birthCert: true,
      signedRules: true,
    },
    garde: {
      matin: true,
      dejeuner: false,
      mercredi: true,
      sortie: true,
    }
  };

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editStep, setEditStep] = useState(1);
  const [formData, setFormData] = useState({
    childInfo: {
      name: childData.name,
      dateOfBirth: childData.dateOfBirth,
      age: childData.age,
      gender: childData.gender,
      level: childData.level,
    },
    parentInfo: {
      mother: {
        name: childData.parent.name,
        phone: childData.parent.phone,
        email: childData.parent.email,
        occupation: childData.parent.occupation,
        address: childData.address,
      },
      father: {
        name: childData.emergency.name,
        phone: childData.emergency.phone,
        email: "",
        occupation: "",
        address: childData.address,
      }
    },
    healthInfo: {
      allergies: childData.health.allergies.join(", "),
      medications: childData.health.medications,
      dietaryRestrictions: childData.health.dietaryRestrictions,
    },
    emergencyInfo: {
      name: childData.emergency.name,
      phone: childData.emergency.phone,
      relationship: childData.emergency.relationship,
    },
    enrollmentInfo: {
      startDate: childData.enrollment.startDate,
      status: childData.enrollment.status,
    },
    documentsInfo: {
      cinFather: childData.documents.cinFather,
      cinMother: childData.documents.cinMother,
      vaccination: childData.documents.vaccination,
      photos: childData.documents.photos,
      birthCert: childData.documents.birthCert,
      signedRules: childData.documents.signedRules,
    },
    gardeInfo: {
      matin: childData.garde.matin,
      dejeuner: childData.garde.dejeuner,
      mercredi: childData.garde.mercredi,
      sortie: childData.garde.sortie,
    }
  });

  const handleChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleParentChange = (parent: 'mother' | 'father', field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      parentInfo: {
        ...prev.parentInfo,
        [parent]: {
          ...prev.parentInfo[parent],
          [field]: value
        }
      }
    }));
  };

  const handleCheckboxChange = (section: string, field: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    console.log("Updated data:", formData);
    setIsEditOpen(false);
    setEditStep(1);
  };

  const nextStep = () => setEditStep(prev => prev + 1);
  const prevStep = () => setEditStep(prev => prev - 1);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <SidebarTrigger className="mb-2" />
            <div className="flex items-center gap-4 mb-4">
              <Link to="/children">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Children
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Child Profile</h1>
                <p className="text-gray-600">View and manage child information</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Summary */}
            <Card className="lg:col-span-1 animate-fade-in">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">
                    {childData.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{childData.name}</h2>
                <Badge className="mb-4">{childData.level}</Badge>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Age:</strong> {childData.age}</p>
                  <p><strong>Gender:</strong> {childData.gender}</p>
                  <p><strong>Date of Birth:</strong> {childData.dateOfBirth}</p>
                  <p><strong>Enrollment Date:</strong> {childData.enrollment.startDate}</p>
                  <p><strong>Status:</strong>
                    <Badge variant="default" className="ml-2">{childData.enrollment.status}</Badge>
                  </p>
                </div>
                <Button
                  className="w-full mt-4 hover:scale-105 transition-transform"
                  onClick={() => setIsEditOpen(true)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Detailed Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Parent Information */}
              <Card className="animate-fade-in" style={{ animationDelay: "100ms" }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Parent Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Mother Contact</h4>
                      <div className="space-y-2 text-sm">
                        <p><strong>Name:</strong> {childData.parent.name}</p>
                        <p><strong>Relationship:</strong> {childData.parent.relationship}</p>
                        <p><strong>Phone:</strong> {childData.parent.phone}</p>
                        <p><strong>Email:</strong> {childData.parent.email}</p>
                        <p><strong>Occupation:</strong> {childData.parent.occupation}</p>
                        <p><strong>Address:</strong> {childData.address}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Father Contact</h4>
                      <div className="space-y-2 text-sm">
                        <p><strong>Name:</strong> {childData.emergency.name}</p>
                        <p><strong>Relationship:</strong> {childData.emergency.relationship}</p>
                        <p><strong>Phone:</strong> {childData.emergency.phone}</p>
                        <p><strong>Address:</strong> {childData.address}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Documents & Garde */}
              <Card className="animate-fade-in" style={{ animationDelay: "300ms" }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Documents & Garde
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Documents</h4>
                      <div className="space-y-2 text-sm">
                        <p><strong>Father's ID:</strong> {childData.documents.cinFather ? "Provided" : "Missing"}</p>
                        <p><strong>Mother's ID:</strong> {childData.documents.cinMother ? "Provided" : "Missing"}</p>
                        <p><strong>Vaccination Record:</strong> {childData.documents.vaccination ? "Provided" : "Missing"}</p>
                        <p><strong>Birth Certificate:</strong> {childData.documents.birthCert ? "Provided" : "Missing"}</p>
                        <p><strong>Signed Rules:</strong> {childData.documents.signedRules ? "Provided" : "Missing"}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Garde Options</h4>
                      <div className="space-y-2 text-sm">
                        <p><strong>Morning Garde:</strong> {childData.garde.matin ? "Yes" : "No"}</p>
                        <p><strong>Lunch Garde:</strong> {childData.garde.dejeuner ? "Yes" : "No"}</p>
                        <p><strong>Wednesday Garde:</strong> {childData.garde.mercredi ? "Yes" : "No"}</p>
                        <p><strong>Afternoon Garde:</strong> {childData.garde.sortie ? "Yes" : "No"}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* EDIT PROFILE MODAL */}
          <Dialog open={isEditOpen} onOpenChange={(open) => {
            if (!open) {
              setEditStep(1);
            }
            setIsEditOpen(open);
          }}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <div className="flex justify-between items-center">
                  <DialogTitle>Edit Child Information</DialogTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Step {editStep} of 7</span>
                    <Button variant="ghost" size="sm" onClick={() => setIsEditOpen(false)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="py-4">
                {editStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Child Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Full Name</Label>
                        <Input
                          value={formData.childInfo.name}
                          onChange={(e) => handleChange("childInfo", "name", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Date of Birth</Label>
                        <Input
                          type="date"
                          value={formData.childInfo.dateOfBirth}
                          onChange={(e) => handleChange("childInfo", "dateOfBirth", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Age</Label>
                        <Input
                          disabled
                          value={formData.childInfo.age}
                        />
                      </div>
                      <div>
                        <Label>Gender</Label>
                        <Select
                          value={formData.childInfo.gender}
                          onValueChange={(value) => handleChange("childInfo", "gender", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Boy">Boy</SelectItem>
                            <SelectItem value="Girl">Girl</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Level</Label>
                        <Input
                          disabled
                          value={formData.childInfo.level}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {editStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold">Parent Information</h3>
                    <div className="space-y-4">
                      <h4 className="font-medium">Mother</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Full Name</Label>
                          <Input
                            value={formData.parentInfo.mother.name}
                            onChange={(e) => handleParentChange("mother", "name", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Phone</Label>
                          <Input
                            value={formData.parentInfo.mother.phone}
                            onChange={(e) => handleParentChange("mother", "phone", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Email</Label>
                          <Input
                            value={formData.parentInfo.mother.email}
                            onChange={(e) => handleParentChange("mother", "email", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Occupation</Label>
                          <Input
                            value={formData.parentInfo.mother.occupation}
                            onChange={(e) => handleParentChange("mother", "occupation", e.target.value)}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label>Address</Label>
                          <Textarea
                            value={formData.parentInfo.mother.address}
                            onChange={(e) => handleParentChange("mother", "address", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Father</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Full Name</Label>
                          <Input
                            value={formData.parentInfo.father.name}
                            onChange={(e) => handleParentChange("father", "name", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Phone</Label>
                          <Input
                            value={formData.parentInfo.father.phone}
                            onChange={(e) => handleParentChange("father", "phone", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Email</Label>
                          <Input
                            value={formData.parentInfo.father.email}
                            onChange={(e) => handleParentChange("father", "email", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Occupation</Label>
                          <Input
                            value={formData.parentInfo.father.occupation}
                            onChange={(e) => handleParentChange("father", "occupation", e.target.value)}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label>Address</Label>
                          <Textarea
                            value={formData.parentInfo.father.address}
                            onChange={(e) => handleParentChange("father", "address", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {editStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Health Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label>Allergies (comma separated)</Label>
                        <Input
                          value={formData.healthInfo.allergies}
                          onChange={(e) => handleChange("healthInfo", "allergies", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Medications</Label>
                        <Input
                          value={formData.healthInfo.medications}
                          onChange={(e) => handleChange("healthInfo", "medications", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Dietary Restrictions</Label>
                        <Input
                          value={formData.healthInfo.dietaryRestrictions}
                          onChange={(e) => handleChange("healthInfo", "dietaryRestrictions", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {editStep === 4 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Emergency Contact</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Full Name</Label>
                        <Input
                          value={formData.emergencyInfo.name}
                          onChange={(e) => handleChange("emergencyInfo", "name", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Phone</Label>
                        <Input
                          value={formData.emergencyInfo.phone}
                          onChange={(e) => handleChange("emergencyInfo", "phone", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Relationship</Label>
                        <Input
                          value={formData.emergencyInfo.relationship}
                          onChange={(e) => handleChange("emergencyInfo", "relationship", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {editStep === 5 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Documents</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(formData.documentsInfo).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-2 p-2 border rounded">
                          <Checkbox
                            id={`doc-${key}`}
                            checked={!!value}
                            onCheckedChange={(v: boolean) => handleCheckboxChange("documentsInfo", key, v)}
                          />
                          <Label htmlFor={`doc-${key}`} className="cursor-pointer">
                            {key.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {editStep === 6 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Garde Options</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(formData.gardeInfo).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-2 p-2 border rounded">
                          <Checkbox
                            id={`garde-${key}`}
                            checked={!!value}
                            onCheckedChange={(v: boolean) => handleCheckboxChange("gardeInfo", key, v)}
                          />
                          <Label htmlFor={`garde-${key}`} className="cursor-pointer">
                            {key === 'matin' ? 'Morning Garde' :
                             key === 'dejeuner' ? 'Lunch Garde' :
                             key === 'mercredi' ? 'Wednesday Garde' :
                             'Afternoon Garde'}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {editStep === 7 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Enrollment Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Enrollment Date</Label>
                        <Input
                          type="date"
                          value={formData.enrollmentInfo.startDate}
                          onChange={(e) => handleChange("enrollmentInfo", "startDate", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Status</Label>
                        <Select
                          value={formData.enrollmentInfo.status}
                          onValueChange={(value) => handleChange("enrollmentInfo", "status", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter className="flex justify-between">
                <div>
                  {editStep > 1 && (
                    <Button variant="outline" onClick={prevStep}>
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                  )}
                </div>
                <div>
                  {editStep < 7 ? (
                    <Button onClick={nextStep}>
                      Next
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button onClick={handleSave}>Save Changes</Button>
                  )}
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ChildProfile;
