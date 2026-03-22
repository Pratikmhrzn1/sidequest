package com.frontend

import android.os.Bundle // Add this
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import org.devio.rn.splashscreen.SplashScreen // Add this

class MainActivity : ReactActivity() {

  // Add this block to show the splash screen on boot
  override fun onCreate(savedInstanceState: Bundle?) {
    SplashScreen.show(this) 
    super.onCreate(savedInstanceState)
  }

  override fun getMainComponentName(): String = "frontend"

  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}