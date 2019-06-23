import React from 'react'
import { Platform, StyleSheet } from 'react-native'
const margin = Platform.OS == 'ios' ? 20 : 0;

export const container = StyleSheet.create({
    container: {
      marginTop: margin,
      flex: 1,
    }
})