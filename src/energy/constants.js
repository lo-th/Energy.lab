/*
 * A list of constants built-in for
 * the energy physics engine.
 */

export var REVISION = '0.0.1';

// joint parametres
export var dParamLoStop = 0;
export var dParamHiStop = 1;
export var dParamVel = 2;
export var dParamLoVel = 3;
export var dParamHiVel = 4;
export var dParamFMax = 5;
export var dParamFudgeFactor = 6;
export var dParamBounce = 7;
export var dParamCFM = 8;
export var dParamStopERP = 9;
export var dParamStopCFM = 10;
export var dParamSuspensionERP = 11;
export var dParamSuspensionCFM = 12;
export var dParamERP = 13;
export var dParamFMax2 = 261;
export var dParamVel2 = 258;
export var dTransmissionParallelAxes = 0;
export var dTransmissionIntersectingAxes = 1;
export var dTransmissionChainDrive = 2;

export var dContactMu2 = 0x001;
export var dContactAxisDep = 0x001;
export var dContactFDir1 = 0x002;
export var dContactBounce = 0x004;
export var dContactSoftERP = 0x008;
export var dContactSoftCFM = 0x010;
export var dContactMotion1 = 0x020;
export var dContactMotion2 = 0x040;
export var dContactMotionN = 0x080;
export var dContactSlip1 = 0x100;
export var dContactSlip2 = 0x200;
export var dContactRolling = 0x400;
export var dContactApprox0 = 0x0000;
export var dContactApprox1_1 = 0x1000;
export var dContactApprox1_2 = 0x2000;
export var dContactApprox1_N = 0x4000;
export var dContactApprox1 = 0x7000;

// DynamicObject parametres
export var mu = 0x001;
export var mu2 = 0x002;
export var bounce = 0x004;
export var bounce_vel = 0x008;
export var soft_erp = 0x010;
export var soft_cfm = 0x020;
export var rho = 0x040;
export var rho2 = 0x080;
export var rhoN = 0x100;
export var motion1 = 0x200;
export var motion2 = 0x400;
export var motionN = 0x800;
export var slip1 = 0x1000;
export var slip2 = 0x2000;

/*
export var dJointTypeNone = 0;
export var dJointTypeBall = 1;
export var dJointTypeHinge = 2;
export var dJointTypeSlider = 3;
export var dJointTypeContact = 4;
export var dJointTypeUniversal = 5;
export var dJointTypeHinge2 = 6;
export var dJointTypeFixed = 7;
export var dJointTypeNull = 8;
export var dJointTypeAMotor = 9;
export var dJointTypeLMotor = 10;
export var dJointTypePlane2D = 11;
export var dJointTypePR = 12;
export var dJointTypePU = 13;
export var dJointTypePiston = 1;
export var dJointTypeDBall = 15;
export var dJointTypeDHinge = 16;
export var dJointTypeTransmission = 17;
*/

export var dxBodyFlagFiniteRotation = 1;
export var dxBodyFlagFiniteRotationAxis = 2;
export var dxBodyDisabled = 4;
export var dxBodyNoGravity = 8;
export var dxBodyAutoDisable = 16;
export var dxBodyLinearDamping = 32;
export var dxBodyAngularDamping = 64;
export var dxBodyMaxAngularSpeed = 128;
export var dxBodyGyroscopic = 256;
export var dxBodyStateNotifyEnergy = 512;