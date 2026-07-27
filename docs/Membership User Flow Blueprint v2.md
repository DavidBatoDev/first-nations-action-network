# **FIRST NATIONS ACTION NETWORK**

# **Membership User Flow Blueprint v2**

## **Purpose**

This document defines the complete lifecycle of a member organisation from initial website visit through to onboarding, participation, renewal and future platform engagement.

The blueprint is designed to support:

-   Membership growth
-   Consistent onboarding
-   Operational scalability
-   CRM integration
-   Future platform development

The member experience should remain consistent even as the underlying technology evolves.

# **Core Principle**

The First Nations Action Network is built around organisations.

The objective is not to create software users.

The objective is to support organisations participating in a national network.

Everything in this workflow should reinforce that principle.

# **MEMBER JOURNEY OVERVIEW**

Discover

↓

Evaluate

↓

Join

↓

Activate

↓

Onboard

↓

Participate

↓

Grow

↓

Renew

# **STAGE 1**

# **DISCOVER**

Potential entry points include:

-   Website
-   Referral from another organisation
-   State network
-   Events
-   Social media
-   Community directory
-   Word of mouth
-   Training programs

## **Homepage**

Visitor learns:

-   What the First Nations Action Network is
-   Why the network exists
-   Who participates
-   How organisations benefit

Primary CTA:

### **Explore Membership**

Secondary CTA:

### **Start the Conversation**

# **STAGE 2**

# **EVALUATE**

Visitor arrives on Membership Page.

Key questions answered:

-   Why should our organisation join?
-   Who is membership for?
-   What outcomes can we expect?
-   What support is available?
-   How much does membership cost?
-   What happens after joining?

## **Decision Point**

Organisation chooses:

### **Join the Network**

↓

Membership Application

# **STAGE 3**

# **MEMBERSHIP APPLICATION**

Membership application serves as both:

-   Application form
-   Organisation onboarding form

## **Organisation Information**

Organisation Name

Organisation Type

State

Region

Organisation Description

Website

Social Media Links

Logo (optional)

## **Organisation Type Options**

Examples:

-   First Nations Organisation
-   Ally Organisation
-   Reconciliation Group
-   Community Group
-   Advocacy Organisation
-   Cultural Organisation
-   Workplace Network
-   Social Enterprise

## **Captain Information**

Primary Contact Name

Position

Email Address

Phone Number

## **Membership Selection**

Monthly Membership

or

Annual Membership

## **Team Information**

Option 1:

Invite additional users later

Option 2:

Add team members during signup

Submit

↓

Stripe Checkout

# **STAGE 4**

# **PAYMENT**

Stripe Checkout

↓

Payment Successful

↓

Membership Activation Workflow Begins

# **STAGE 5**

# **ORGANISATION CREATION**

The website database becomes the source of truth.

## **Create Organisation Record**

Store:

-   Organisation ID
-   Organisation Name
-   Organisation Type
-   State
-   Region
-   Membership Status
-   Membership Plan
-   Renewal Date
-   Captain ID

## **Create Captain Record**

Store:

-   User ID
-   Name
-   Email
-   Organisation ID
-   Role = Captain

## **Create Membership Record**

Store:

-   Membership ID
-   Organisation ID
-   Plan
-   Start Date
-   Renewal Date
-   Status

# **CRITICAL RULE**

Organisation records are owned by:

### **First Nations Action Network**

NOT Stripe

NOT Action Network

NOT Action Builder

This ensures future migration flexibility.

# **STAGE 6**

# **WELCOME EXPERIENCE**

Immediately after successful payment.

## **Thank You Page**

Welcome to the Network.

Membership confirmed.

Next steps explained.

## **Email Sequence**

### **Email 1**

Welcome to the First Nations Action Network

### **Email 2**

What Happens Next

### **Email 3**

Book Your Onboarding Session

### **Email 4**

Meet The Network

# **STAGE 7**

# **PROVISIONING**

Current Version

Internal notification sent to Network Administrator.

## **Action Network Setup**

Create or assign organisation structure.

Configure access.

Assign permissions.

## **Action Builder Setup**

Create organising workspace.

Configure leadership structure.

Assign Captain access.

## **Additional User Invitations**

Invite team members.

Assign roles.

Status:

Provisioning Complete

# **STAGE 8**

# **ONBOARDING**

Organisation participates in onboarding process.

## **Onboarding Objectives**

Understand the network.

Understand available resources.

Understand participation opportunities.

Understand organising infrastructure.

Connect with support channels.

## **Onboarding Topics**

### **Welcome to the Network**

### **Membership Benefits**

### **Community Directory**

### **Events & Opportunities**

### **Community Organising Infrastructure**

### **Resources & Learning**

### **Support Channels**

Completion Status:

Onboarded

# **STAGE 9**

# **ACTIVATION**

The objective is to help organisations experience value quickly.

## **First 30 Days**

Organisation completes:

✓ First communication

or

✓ First engagement activity

## **First 60 Days**

Organisation participates in:

✓ Event

or

✓ Campaign

or

✓ Community activity

## **First 90 Days**

Organisation is actively participating in the network.

Status:

Activated Member

# **STAGE 10**

# **PARTICIPATION**

Organisation becomes an active member of the ecosystem.

Examples:

-   Events
-   Training
-   Campaigns
-   Community initiatives
-   Story sharing
-   Collaborative projects
-   Community directory participation

# **STAGE 11**

# **GROWTH**

As organisations become more engaged they may participate in:

### **Leadership Opportunities**

### **Collaborative Projects**

### **Training Programs**

### **Community Events**

### **Regional Initiatives**

### **Network Development Activities**

# **STAGE 12**

# **RENEWAL**

90 Days Before Renewal

↓

Membership Review

↓

Impact Summary

↓

Renewal Reminder

↓

Membership Renewal

# **COMMUNITY DIRECTORY FLOW**

Future Directory Participation

Organisation joins network

↓

Organisation profile created

↓

Profile reviewed

↓

Published to directory

↓

Discoverable by other organisations

↓

Collaboration opportunities increase

# **USER ROLES**

## **Network Administrator**

National access

Responsible for:

-   Membership management
-   Platform administration
-   Network oversight

## **State Coordinator**

Regional access

Responsible for:

-   Member support
-   Onboarding
-   Relationship building
-   Community engagement

## **Captain**

Organisation administrator

Responsible for:

-   Membership management
-   Team management
-   Organisational participation

## **Team Member**

Organisation contributor

Responsible for participating in activities, communications and community initiatives.

# **CURRENT TECHNOLOGY FLOW**

Version 1

Website

↓

Membership Database

↓

Stripe

↓

Provisioning Workflow

↓

Action Network

↓

Action Builder

↓

Organisation Members

# **FUTURE TECHNOLOGY FLOW**

Version 2

Website

↓

Membership Database

↓

Member Portal

↓

First Nations Action Network Platform

↓

Communications

↓

Events

↓

Resources

↓

Training

↓

Community Engagement

↓

Community Directory

# **SUCCESS METRICS**

The purpose of this workflow is to create:

-   Active organisations
-   Connected communities
-   Stronger relationships
-   Greater participation
-   Increased collaboration
-   Sustainable network growth

Success is not measured by software adoption.

Success is measured by community engagement and positive outcomes.

# **USER FLOW VISION**

An organisation discovers the First Nations Action Network, joins the network, builds relationships, accesses resources, participates in community activities and contributes to a growing national movement working toward stronger communities and positive change.