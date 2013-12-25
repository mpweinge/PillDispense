//
//  TTWServerBridge.h
//  PillDispense
//
//  Created by Michael Weingert on 2013-12-24.
//  Copyright (c) 2013 Michael Weingert. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface TTWServerBridge : NSObject

- (NSString *) getDataFrom:(NSString *)url withRequestString:(NSString *)requestString;

-(NSString* )GetAllInventory;

-(NSString* ) GetInventory:(NSString*) name;

-(NSString* ) RegisterPill:(NSString*) name withNumLeft: (NSString*) numLeft;

-(NSString* ) UpdateInventory:(NSString*) name withNumLeft: (NSString*) numLeft;

@end
