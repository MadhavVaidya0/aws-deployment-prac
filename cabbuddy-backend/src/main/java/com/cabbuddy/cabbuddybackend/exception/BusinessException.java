//package com.cabbuddy.cabbuddybackend.exception;
//
//public class BusinessException {
//
//}
package com.cabbuddy.cabbuddybackend.exception;

/**
 * Thrown when business rules are violated.
 */
public class BusinessException extends RuntimeException {
    public BusinessException(String message) {
        super(message);
    }
}
