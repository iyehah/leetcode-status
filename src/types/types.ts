import { NextApiRequest, NextApiResponse } from "next";

export interface ThemeColors {
  backgroundColor: string;
  textColor: string;
  progressBackgroundColor: string;
  progressBarBackgroundColor: string;
  progressBarFillColor: string;
  borderColor: string;
  gridLines: string;
}

export interface LeetCodeData {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalEasy: number;
  totalMedium: number;
  totalHard: number;
}

export interface ThemeColors {
  backgroundColor: string;
  textColor: string;
  progressBackgroundColor: string;
  progressBarBackgroundColor: string;
  progressBarFillColor: string;
  borderColor: string;
  gridLines: string;
}

export interface LeetCodeData {
  totalSolved: number;
  totalEasy: number;
  totalMedium: number;
  totalHard: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking?: number;
  acceptanceRate?: number;
}

export interface ParsedQuery {
  username: string;
  theme: string;
  border: boolean;
  hideTitle: boolean;
  customTitle: string | undefined;
  animation: boolean;
  animationDuration: string;
  logo: boolean;
  logoColor: string | undefined;
  barWidth: number;
  barColor: string | undefined;
  textColor: string | undefined;
  showStats: boolean;
}

export interface ThemeColors {
  backgroundColor: string;
  textColor: string;
  progressBackgroundColor: string;
  progressBarBackgroundColor: string;
  progressBarFillColor: string;
  borderColor: string;
  gridLines: string;
}

export interface LeetCodeData {
  totalSolved: number;
  totalEasy: number;
  totalMedium: number;
  totalHard: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking?: number;
  acceptanceRate?: number;
}

export interface ParsedQuery {
  username: string;
  theme: string;
  border: boolean;
  hideTitle: boolean;
  customTitle: string | undefined;
  animation: boolean;
  animationDuration: string;
  logo: boolean;
  logoColor: string | undefined;
  barWidth: number;
  barColor: string | undefined;
  textColor: string | undefined;
  showStats: boolean;
  gradientStart: string | undefined;
  gradientEnd: string | undefined;
}

export type ApiRequest = NextApiRequest;
export type ApiResponse = NextApiResponse;
