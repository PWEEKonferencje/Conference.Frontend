import { Breadcrumb } from "@/components/breadcrumb";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Tag,
  ExternalLink,
  CheckCircle,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useParams } from "react-router";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ParticipantAffiliationPage() {
  const { conferenceId } = useParams();
  console.log(conferenceId);

  const [confirmed, setConfirmed] = useState(false);
  const [confirmationDate, setConfirmationDate] = useState<
    string | undefined
  >();

  const affiliationData = {
    fullName: "Dr. Sarah Johnson",
    titles: "Dr. Engr.",
    institutionName: "Warsaw University of Technology",
    institutionPosition: "Lecturer",
    contactEmails: ["sarah@gmail.com", "sarah.jeo@pw.edu.pl"],
    phoneNumbers: ["510 123 435", "10 234 10 30 34"],
    location: "Warsaw University of Technology, Building GG, Room 103",
    registrationDate: "10/03/2025",
    confirmationDate: "10/03/2025",
    additionalInfo: "Space for parking kayak is required",
    expertiseAreas: ["AI", "MICROSERVICES", "DEEP LEARNING"],
    appearanceConfirmed: false,
  };

  const handleConfirmToggle = (checked: boolean) => {
    setConfirmed(checked);
    if (checked) {
      const now = new Date();
      const formattedDate = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
      setConfirmationDate(formattedDate);
    } else {
      setConfirmationDate(undefined);
    }
  };

  return (
    <>
      <Breadcrumb
        items={[{ label: "Participant" }, { label: "Affiliation" }]}
      />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Affiliation data
            </h1>
            <p className="text-gray-600 mt-1">
              Check what you are visible to others in this conference
            </p>
          </div>
          <Link to={`/participant/${conferenceId}/settings/profile`}>
            <Button variant="outline" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              View Profile
              <ExternalLink className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Appearance Confirmation Section */}
        <Alert
          className={
            confirmed
              ? "border-green-500 bg-green-50"
              : "border-amber-500 bg-amber-50"
          }
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-3">
              {confirmed ? (
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              ) : (
                <Bell className="h-5 w-5 text-amber-500 mt-0.5" />
              )}
              <div>
                <AlertTitle className="text-base">
                  Conference Appearance Confirmation
                </AlertTitle>
                <AlertDescription className="text-sm mt-1">
                  By confirming, you agree that your name and affiliation will
                  be visible to other conference participants and may appear in
                  the conference program, website, and other materials.
                </AlertDescription>
                {confirmationDate && (
                  <p className="text-xs text-green-700 mt-2">
                    Confirmed on: {confirmationDate}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 ml-8 sm:ml-0">
              <Switch
                checked={confirmed}
                onCheckedChange={handleConfirmToggle}
              />
              <span className="text-sm font-medium">
                {confirmed ? "Confirmed" : "Confirm appearance"}
              </span>
            </div>
          </div>
        </Alert>

        {/* General Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              General
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Full name
                  </label>
                  <p className="text-gray-900 font-medium">
                    {affiliationData.fullName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Institution name
                  </label>
                  <p className="text-gray-900">
                    {affiliationData.institutionName}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Titles
                  </label>
                  <p className="text-gray-900">{affiliationData.titles}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Institution position
                  </label>
                  <p className="text-gray-900">
                    {affiliationData.institutionPosition}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact info
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Contact mails
                  </label>
                  <div className="space-y-1">
                    {affiliationData.contactEmails.map((email, index) => (
                      <p key={index} className="text-gray-900">
                        {email}
                      </p>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </label>
                  <p className="text-gray-900">{affiliationData.location}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Numbers
                  </label>
                  <div className="space-y-1">
                    {affiliationData.phoneNumbers.map((phone, index) => (
                      <p key={index} className="text-gray-900">
                        {phone}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Registration Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Registration details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Registration date
                  </label>
                  <p className="text-gray-900">
                    {affiliationData.registrationDate}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Additional information
                  </label>
                  <p className="text-gray-900">
                    {affiliationData.additionalInfo}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Confirmation date
                  </label>
                  <p className="text-gray-900">
                    {affiliationData.confirmationDate}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expertise Areas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Expertise areas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {affiliationData.expertiseAreas.map((area, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1">
                  {area}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
