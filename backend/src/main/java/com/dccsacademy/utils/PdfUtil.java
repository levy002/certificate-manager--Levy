package com.dccsacademy.utils;

import java.util.Base64;

public class PdfUtil {

  private static final String PREFIX = "data:application/pdf;base64,";

  public static String encode(byte[] data) {
    if (data == null) {
      return null;
    }
    return PREFIX + Base64.getEncoder().encodeToString(data);
  }

  public static byte[] decode(String base64String) {
    if (base64String == null || base64String.isEmpty()) {
      return null;
    }

    if (base64String.startsWith(PREFIX)) {
      base64String = base64String.substring(PREFIX.length());
    }

    return Base64.getDecoder().decode(base64String);
  }
}
