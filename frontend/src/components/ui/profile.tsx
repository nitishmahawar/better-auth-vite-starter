"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";

interface ProfileProps {
  imageUrl?: string;
  name?: string;
  email?: string;
}

interface ProfileRootProps extends ProfileProps {
  children?: React.ReactNode;
  className?: string;
}

interface ProfileImageProps {
  src?: string;
  alt?: string;
  className?: string;
}

interface ProfileContentProps {
  children?: React.ReactNode;
  className?: string;
}

interface ProfileNameProps {
  children?: React.ReactNode;
  className?: string;
}

interface ProfileEmailProps {
  children?: React.ReactNode;
  className?: string;
}

const ProfileRoot = React.forwardRef<HTMLDivElement, ProfileRootProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex items-center gap-x-2", className)}>
        {children}
      </div>
    );
  }
);
ProfileRoot.displayName = "ProfileRoot";

const ProfileImage = React.forwardRef<
  React.ElementRef<typeof Avatar>,
  ProfileImageProps
>(({ className, src, alt, ...props }, ref) => {
  return (
    <Avatar ref={ref} className={className} {...props}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{alt?.charAt(0)}</AvatarFallback>
    </Avatar>
  );
});
ProfileImage.displayName = "ProfileImage";

const ProfileContent = React.forwardRef<HTMLDivElement, ProfileContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(className)} {...props}>
        {children}
      </div>
    );
  }
);
ProfileContent.displayName = "ProfileContent";

const ProfileName = React.forwardRef<HTMLHeadingElement, ProfileNameProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h1 ref={ref} className={cn("font-medium", className)} {...props}>
        {children}
      </h1>
    );
  }
);
ProfileName.displayName = "ProfileName";

const ProfileEmail = React.forwardRef<HTMLParagraphElement, ProfileEmailProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);
ProfileEmail.displayName = "ProfileEmail";

export { ProfileRoot, ProfileImage, ProfileContent, ProfileName, ProfileEmail };
