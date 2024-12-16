'use server'

import { revalidatePath } from 'next/cache'
import { client } from "../../sanity/lib/client"

import { handleError } from '@/lib/utils'

import { groq } from 'next-sanity'

export async function createUser() {
  try {
    

  } catch (error) {
    handleError(error)
  }
}

export async function getAllUsers() {
  try {

  } catch (error) {
    handleError(error)
  }
}

export async function getUserId(userId: string) {
  try {

  } catch (error) {
    handleError(error)
  }
}

export async function getUserById(userId: string) {
  try {

  } catch (error) {
    handleError(error)
  }
}

export async function updateUser() {
  try {

  } catch (error) {
    handleError(error)
  }
}

export async function deleteUser(Id: string) {
  try {
 
  } catch (error) {
    handleError(error)
  }
}