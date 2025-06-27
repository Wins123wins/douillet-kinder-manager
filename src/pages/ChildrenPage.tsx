
import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronUp, ChevronDown, List, Grid, Plus, Eye, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { ChildService, Child } from "@/services/api";

const ChildrenPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [niveauFilter, setNiveauFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [parentType, setParentType] = useState("mother");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [childToDelete, setChildToDelete] = useState<number | null>(null);
  const [children, setChildren] = useState<Child[]>([]);

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        setIsLoading(true);
        const data = await ChildService.getAll();
        setChildren(data);
      } catch (err) {
        setError("Failed to fetch children data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChildren();
  }, []);

  const handleDelete = (id: number) => {
    setChildToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!childToDelete) return;
    
    try {
      await ChildService.delete(childToDelete);
      setChildren(children.filter(child => child.id !== childToDelete));
      toast({
        title: "Success",
        description: "Child record deleted successfully",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete child record",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setChildToDelete(null);
    }
  };

  const requestSort = (key: string) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const calculateDocumentProgress = (documents: any) => {
    const total = Object.keys(documents).length;
    const provided = Object.values(documents).filter(Boolean).length;
    return (provided / total) * 100;
  };

  const sortedChildren = [...children]
    .filter(child => child.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(child => niveauFilter === "all" ? true : child.class === niveauFilter)
    .sort((a, b) => {
      if (sortConfig.key) {
        const aValue = a[sortConfig.key as keyof Child];
        const bValue = b[sortConfig.key as keyof Child];
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      }
      return 0;
    });

  if (isLoading) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gray-50">
          <AppSidebar />
          <main className="flex-1 p-6">
            <div className="mb-6">
              <SidebarTrigger className="mb-2" />
              <h1 className="text-3xl font-bold text-gray-900">Children Management</h1>
              <p className="text-gray-600">Loading...</p>
            </div>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  if (error) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gray-50">
          <AppSidebar />
          <main className="flex-1 p-6">
            <div className="mb-6">
              <SidebarTrigger className="mb-2" />
              <h1 className="text-3xl font-bold text-gray-900">Children Management</h1>
              <p className="text-red-600">{error}</p>
            </div>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <SidebarTrigger className="mb-2" />
            <h1 className="text-3xl font-bold text-gray-900">Children Management</h1>
            <p className="text-gray-600">Manage student profiles and information</p>
          </div>

          <Card className="animate-fade-in">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle>Children List</CardTitle>
                <div className="flex flex-wrap gap-2 items-center">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search children..."
                      className="pl-10 w-48"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select 
                    onValueChange={setNiveauFilter}
                    value={niveauFilter}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by Niveau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Niveaux</SelectItem>
                      <SelectItem value="TPS">TPS (2-3 years)</SelectItem>
                      <SelectItem value="PS">PS (3-4 years)</SelectItem>
                      <SelectItem value="MS">MS (4-5 years)</SelectItem>
                      <SelectItem value="GS">GS (5-6 years)</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select onValueChange={setParentType} value={parentType}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Parent" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mother">Mother</SelectItem>
                      <SelectItem value="father">Father</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex gap-1">
                    <Button onClick={() => setViewMode("table")} variant={viewMode === "table" ? "default" : "outline"}><List className="w-4 h-4" /></Button>
                    <Button onClick={() => setViewMode("card")} variant={viewMode === "card" ? "default" : "outline"}><Grid className="w-4 h-4" /></Button>
                  </div>
                  <Link to="/enrollment">
                    <Button variant="default" className="flex items-center gap-2">
                      <Plus className="w-4 h-4" /> Add New Child
                    </Button>
                  </Link>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {viewMode === "table" ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-medium text-gray-700">Photo</th>
                        <th className="text-left p-4 font-medium text-gray-700">Name</th>
                        <th className="text-left p-4 font-medium text-gray-700 cursor-pointer" onClick={() => requestSort("age")}>Age {sortConfig.key === 'age' ? (sortConfig.direction === 'asc' ? <ChevronUp className="inline w-4 h-4" /> : <ChevronDown className="inline w-4 h-4" />) : null}</th>
                        <th className="text-left p-4 font-medium text-gray-700 cursor-pointer" onClick={() => requestSort("class")}>Class {sortConfig.key === 'class' ? (sortConfig.direction === 'asc' ? <ChevronUp className="inline w-4 h-4" /> : <ChevronDown className="inline w-4 h-4" />) : null}</th>
                        <th className="text-left p-4 font-medium text-gray-700">Parent Name</th>
                        <th className="text-left p-4 font-medium text-gray-700">Contact</th>
                        <th className="text-left p-4 font-medium text-gray-700">Status</th>
                        <th className="text-left p-4 font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedChildren.map((child, index) => (
                        <tr key={child.id} className="border-b hover:bg-gray-50 transition-colors animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                          <td className="p-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-blue-600">
                                {child.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          </td>
                          <td className="p-4 font-medium text-gray-900">{child.name}</td>
                          <td className="p-4 text-gray-600">{child.age}</td>
                          <td className="p-4">
                            <Badge variant="secondary">{child.class}</Badge>
                          </td>
                          <td className="p-4 text-gray-600">
                            {parentType === "both" ? (
                              <div className="space-y-1">
                                <div className="text-sm">{child.mother}</div>
                                <div className="text-sm">{child.father}</div>
                              </div>
                            ) : (
                              parentType === "mother" ? child.mother : child.father
                            )}
                          </td>
                          <td className="p-4 text-gray-600">
                            {parentType === "both" ? (
                              <div className="space-y-1">
                                <div className="text-sm">{child.motherContact}</div>
                                <div className="text-sm">{child.fatherContact}</div>
                              </div>
                            ) : (
                              parentType === "mother" ? child.motherContact : child.fatherContact
                            )}
                          </td>
                          <td className="p-4">
                            <Badge variant={child.status === "Present" ? "default" : "destructive"}>{child.status}</Badge>
                          </td>
                          <td className="p-4 flex gap-2">
                            <Link to={`/child/${child.id}`}>
                              <Button variant="outline" size="sm" className="hover:scale-105 transition-transform p-2">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="hover:scale-105 transition-transform p-2 hover:bg-red-50 hover:text-red-600"
                              onClick={() => handleDelete(child.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sortedChildren.map(child => (
                    <Card key={child.id} className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                          {child.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">{child.name}</h3>
                            <Badge variant="secondary">{child.class}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">Age: {child.age}</p>
                          <p className="text-sm text-gray-600">
                            {parentType === "both" ? (
                              <>
                                Mother: {child.mother}<br />
                                Father: {child.father}
                              </>
                            ) : (
                              `${parentType === "mother" ? "Mother" : "Father"}: ${parentType === "mother" ? child.mother : child.father}`
                            )}
                          </p>
                          <p className="text-sm text-gray-600">
                            {parentType === "both" ? (
                              <>
                                Mother: {child.motherContact}<br />
                                Father: {child.fatherContact}
                              </>
                            ) : (
                              `Contact: ${parentType === "mother" ? child.motherContact : child.fatherContact}`
                            )}
                          </p>
                          
                          {/* Documents Progress */}
                          <div className="mt-2">
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                              <span>Documents</span>
                              <span>{Math.round(calculateDocumentProgress(child.documents))}%</span>
                            </div>
                            <Progress value={calculateDocumentProgress(child.documents)} className="h-2" />
                            <div className="grid grid-cols-2 gap-1 mt-2 text-xs">
                              <div className={`flex items-center ${child.documents.fatherId ? 'text-green-600' : 'text-red-600'}`}>
                                {child.documents.fatherId ? '✓' : '✗'} Father's ID
                              </div>
                              <div className={`flex items-center ${child.documents.motherId ? 'text-green-600' : 'text-red-600'}`}>
                                {child.documents.motherId ? '✓' : '✗'} Mother's ID
                              </div>
                              <div className={`flex items-center ${child.documents.vaccination ? 'text-green-600' : 'text-red-600'}`}>
                                {child.documents.vaccination ? '✓' : '✗'} Vaccination
                              </div>
                              <div className={`flex items-center ${child.documents.birthCertificate ? 'text-green-600' : 'text-red-600'}`}>
                                {child.documents.birthCertificate ? '✓' : '✗'} Birth Cert.
                              </div>
                              <div className={`flex items-center ${child.documents.signedRules ? 'text-green-600' : 'text-red-600'}`}>
                                {child.documents.signedRules ? '✓' : '✗'} Signed Rules
                              </div>
                            </div>
                          </div>
                          
                          {/* Grade Options */}
                          <div className="mt-2">
                            <p className="text-xs text-gray-500 mb-1">Grade Options:</p>
                            <div className="flex flex-wrap gap-1">
                              {child.gradeOptions.map(option => (
                                <Badge key={option} variant="outline" className="text-xs">
                                  {option}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                        <Link to={`/child/${child.id}`}>
                          <Button variant="outline" size="sm" className="p-2">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="p-2 hover:bg-red-50 hover:text-red-600"
                          onClick={() => handleDelete(child.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the child's record from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700"
              onClick={confirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarProvider>
  );
};

export default ChildrenPage;
