//
//  TTWViewController.m
//  PillDispense
//
//  Created by Michael Weingert on 2013-12-24.
//  Copyright (c) 2013 Michael Weingert. All rights reserved.
//

#import "TTWViewController.h"

@interface TTWViewController ()

@end

@implementation TTWViewController

@synthesize LoginButton = _LoginButton;
@synthesize RegisterButton = _RegisterButton;

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
    
    serverBridge = [[TTWServerBridge alloc] init];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

-(IBAction)Login:(id)sender
{
    NSLog(@"Login button clicked");
    
    [serverBridge GetAllInventory];
}

-(IBAction)Register:(id)sender
{
    NSLog(@"Register button clicked");
}

@end
