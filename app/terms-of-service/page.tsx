import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Mail,
  Scale,
  User,
  CreditCard,
  Copyright,
  Ban,
  AlertTriangle,
  Shield,
  Gavel,
  Phone,
  Clock,
  Scale3D,
} from 'lucide-react';

export default function TermsOfService() {
  const sections = [
    {
      id: 1,
      title: 'Use of the Service',
      icon: <User className='w-5 h-5' />,
      content:
        'You agree to use Sourzer in compliance with all applicable laws and not to:',
      list: [
        'Access data you do not have permission to access',
        'Use the Service to harass, harm, or violate the rights of others',
        'Reverse-engineer or attempt to disrupt the platform',
      ],
    },
    {
      id: 2,
      title: 'User Accounts',
      icon: <User className='w-5 h-5' />,
      content:
        'You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your login credentials.',
    },
    {
      id: 3,
      title: 'Subscription & Payment',
      icon: <CreditCard className='w-5 h-5' />,
      content:
        'Paid plans are billed monthly or annually. By subscribing, you agree to recurring billing unless cancelled. Prices may change with advance notice.',
    },
    {
      id: 4,
      title: 'Intellectual Property',
      icon: <Copyright className='w-5 h-5' />,
      content:
        'All content, features, and functionality of Sourzer are the exclusive property of Sourzer, unless otherwise stated. Users retain ownership of the data they submit.',
    },
    {
      id: 5,
      title: 'Termination',
      icon: <Ban className='w-5 h-5' />,
      content:
        'We reserve the right to suspend or terminate access for violations of these Terms or conduct that harms the platform or other users.',
    },
    {
      id: 6,
      title: 'Limitation of Liability',
      icon: <AlertTriangle className='w-5 h-5' />,
      content:
        'Sourzer is provided "as is" and "as available." We are not liable for indirect or consequential damages. Our total liability shall not exceed the amount you paid us in the past 12 months.',
    },
    {
      id: 7,
      title: 'Indemnification',
      icon: <Shield className='w-5 h-5' />,
      content:
        'You agree to indemnify and hold harmless Sourzer, its affiliates, and employees from any claims or liabilities arising from your use of the Service or violation of these Terms.',
    },
    {
      id: 8,
      title: 'Governing Law',
      icon: <Scale className='w-5 h-5' />,
      content:
        'These Terms are governed by the laws of [Insert Jurisdiction], without regard to conflict of laws principles.',
    },
    {
      id: 9,
      title: 'Dispute Resolution',
      icon: <Gavel className='w-5 h-5' />,
      content:
        'Disputes will first be attempted to be resolved informally. Failing that, disputes shall be settled through arbitration in accordance with Nigeria Law.',
    },
  ];

  return (
    <div className='min-h-scree font-sans'>
      <div className='max-w-4xl mx-auto px-4 py-12'>
        {/* Header */}
        <div className='text-center mb-12'>
          <div className='flex items-center justify-center mb-4'>
            <Scale className='w-8 h-8 text-purple-600 mr-3' />
            <h1 className='text-3xl font-medium'>Terms of Service</h1>
          </div>
          <div className='flex items-center justify-center space-x-4 mb-6'>
            <Badge variant='secondary' className='text-sm'>
              <Clock className='w-4 h-4 mr-1' />
              Effective Date: 12 June 2025
            </Badge>
          </div>
          <p className='text-md text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
            These Terms of Service ("Terms") govern your access to and use of
            the <span className='font-semibold text-purple-600'>Sourzer</span>{' '}
            platform. By using the Service, you agree to these Terms.
          </p>
        </div>

        {/* Terms Sections */}
        <div className='space-y-6'>
          {sections.map((section) => (
            <Card key={section.id} className='shadow-none'>
              <CardHeader>
                <CardTitle className='flex items-center text-xl'>
                  {section.icon}
                  <span className='ml-3'>
                    {section.id}. {section.title}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground leading-relaxed mb-3'>
                  {section.content}
                </p>
                {section.list && (
                  <div className='space-y-2 pl-4'>
                    {section.list.map((item, index) => (
                      <div key={index} className='flex items-start'>
                        <div className='w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0'></div>
                        <p className='text-muted-foreground leading-relaxed'>
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <Card className='mt-8 shadow-none'>
          <CardHeader>
            <CardTitle className='flex items-center text-xl'>
              <Phone className='w-5 h-5 mr-3' />
              10. Contact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-muted-foreground leading-relaxed mb-4'>
              For questions about these Terms, contact:
            </p>
            <a className='flex items-center' href='mailto:legal@sourzer.co'>
              <Mail className='w-4 h-4 mr-3 text-purple-600' />
              <span className='font-semibold text-purple-600'>
                legal@sourzer.co
              </span>
            </a>
          </CardContent>
        </Card>

        {/* Agreement Notice */}
        <Alert className='mt-8 border-purple-200 bg-purple-50'>
          <Phone className='h-4 w-4 text-purple-600' />
          <AlertDescription className='text-purple-800'>
            <strong>By using Sourzer</strong>, you acknowledge and agree to the
            above Privacy Policy and Terms of Service.
          </AlertDescription>
        </Alert>

        {/* Footer */}
        <Separator className='my-8' />
        <div className='text-center text-sm text-muted-foreground'>
          <p>© 2025 Sourzer. All rights reserved.</p>
          <p className='mt-1'>
            These terms of service were last updated on 12 June 2025.
          </p>
        </div>
      </div>
    </div>
  );
}
