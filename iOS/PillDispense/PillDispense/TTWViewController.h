//
//  TTWViewController.h
//  PillDispense
//
//  Created by Michael Weingert on 2013-12-24.
//  Copyright (c) 2013 Michael Weingert. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "TTWServerBridge.h"

@interface TTWViewController : UIViewController
{
    UIButton * LoginButton;
    UIButton * RegisterButton;
    TTWServerBridge* serverBridge;
}

@property (nonatomic, retain) IBOutlet UIButton *LoginButton;
@property (nonatomic, retain) IBOutlet UIButton *RegisterButton;

-(IBAction)Login;
-(IBAction)Register;

@end
