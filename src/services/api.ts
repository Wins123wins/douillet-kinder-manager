
// Mock API service for children data
export interface Child {
  id: number;
  name: string;
  age: number;
  class: string;
  mother: string;
  father: string;
  motherContact: string;
  fatherContact: string;
  status: string;
  documents: {
    fatherId: boolean;
    motherId: boolean;
    vaccination: boolean;
    birthCertificate: boolean;
    signedRules: boolean;
  };
  gradeOptions: string[];
}

export const ChildService = {
  async getAll(): Promise<Child[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return [
      {
        id: 1,
        name: "Emma Thompson",
        age: 4,
        class: "MS",
        mother: "Sarah Thompson",
        father: "John Thompson",
        motherContact: "(555) 123-4567",
        fatherContact: "(555) 987-6543",
        status: "Present",
        documents: {
          fatherId: true,
          motherId: true,
          vaccination: true,
          birthCertificate: false,
          signedRules: true
        },
        gradeOptions: ["Morning", "Wednesday"]
      },
      {
        id: 2,
        name: "Liam Johnson",
        age: 5,
        class: "GS",
        mother: "Emily Johnson",
        father: "Michael Johnson",
        motherContact: "(555) 234-5678",
        fatherContact: "(555) 876-5432",
        status: "Present",
        documents: {
          fatherId: true,
          motherId: false,
          vaccination: false,
          birthCertificate: true,
          signedRules: false
        },
        gradeOptions: ["Lunch", "Afternoon"]
      },
      {
        id: 3,
        name: "Sophia Davis",
        age: 3,
        class: "PS",
        mother: "Jessica Davis",
        father: "Robert Davis",
        motherContact: "(555) 345-6789",
        fatherContact: "(555) 765-4321",
        status: "Absent",
        documents: {
          fatherId: false,
          motherId: true,
          vaccination: true,
          birthCertificate: true,
          signedRules: true
        },
        gradeOptions: ["Morning", "Afternoon"]
      },
      {
        id: 4,
        name: "Noah Wilson",
        age: 4,
        class: "MS",
        mother: "Lisa Wilson",
        father: "David Wilson",
        motherContact: "(555) 456-7890",
        fatherContact: "(555) 654-3210",
        status: "Present",
        documents: {
          fatherId: true,
          motherId: true,
          vaccination: false,
          birthCertificate: false,
          signedRules: false
        },
        gradeOptions: ["Wednesday"]
      },
      {
        id: 5,
        name: "Olivia Brown",
        age: 2,
        class: "TPS",
        mother: "Amanda Brown",
        father: "James Brown",
        motherContact: "(555) 567-8901",
        fatherContact: "(555) 543-2109",
        status: "Present",
        documents: {
          fatherId: false,
          motherId: false,
          vaccination: true,
          birthCertificate: true,
          signedRules: true
        },
        gradeOptions: ["Lunch"]
      }
    ];
  },

  async delete(id: number): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real app, this would make an HTTP DELETE request
    console.log(`Deleting child with id: ${id}`);
  }
};
