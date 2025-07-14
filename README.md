# Venue Booking System

Management system for venue using nodejs and nextjs.

## Capturing User Search Activity

We can add a new search activity table in the database to store user search keywords and the type of venue users click on most frequently.
For example:
- Searching for a 200-capacity venue
- Clicking on a venue where parking is available

## Admin Analytics Dashboard and Venue Management Enhancements

I'd like to integrate LLM AI on the admin dashboard side to make venue management easier and take suggestions from AI. add more aggregation on data as per needs.
For example:
- most searching venues.
- top venues.
- user average venue bookings prices.

## Calendar View for Venue Availability

- We need to create a venue availability API that provides booking and date information so the web can implement this on the frontend side.
- In the frontend side, we will mark all booked dates and block dates as red to indicate that the date is unavailable, allowing users to easily identify available dates.

## Basic Authentication for Admin and Venue Owners

- I have already added authentication for admins, and currently, admins can create and manage venues.
- We can add a separate table for venue owners and give features to admins so admins can manage these venue owners.
- I will make features for venue owners to create and manage venues.
