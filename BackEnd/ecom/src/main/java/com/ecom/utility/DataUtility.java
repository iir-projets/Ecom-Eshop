package com.ecom.utility;


import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;



public class DataUtility 
{
	/**
	 * Application Date Format
	 */
	public static final String APP_DATE_FORMAT = "yyyy-MM-dd";
	
	public static final String APP_DATE_FORMAT1 = "dd/MM/yyyy";
	
	

	public static final String APP_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";

	/**
	 * Date formatter
	 */
	private static final SimpleDateFormat formatter = new SimpleDateFormat(APP_DATE_FORMAT);
	private static final SimpleDateFormat formatter1 = new SimpleDateFormat(APP_TIME_FORMAT);

	//private static final SimpleDateFormat timeFormatter = new SimpleDateFormat(APP_TIME_FORMAT);

	/**
	 * Trims and trailing and leading spaces of a String
	 * 
	 * @param val
	 * @return
	 */
	public static String getString(String val) {
		if (DataValidator.isNotNull(val)) {
			return val.trim();
		} else {
			return val;
		}
	}

	/**
	 * Converts and Object to String
	 * 
	 * @param val
	 * @return
	 */
	public static String getStringData(Object val) {
		
		if (val != null ) {
			return val.toString();
		} else {
			return "";
		}
	}

	/**
	 * Converts String into Integer
	 * 
	 * @param val
	 * @return
	 */
	public static int getInt(String val) {
		if (DataValidator.isInteger(val)) {
			return Integer.parseInt(val);
		} else {
			return 0;
		}
	}

	/**
	 * Converts String into Long
	 * 
	 * @param val
	 * @return
	 */
	public static long getLong(String val) {
		if (DataValidator.isLong(val)) {
			return Long.parseLong(val);
		} else {
			return 0;
		}
	}

	/**
	 * Converts String into Date
	 * 
	 * @param val
	 * @return
	 */
	 public static Date getDate(String val) {
	        Date date = null;
	        try {
	            date = formatter.parse(val);
	        } catch (Exception e) {

	        }
	        return date;
	    }

	public static Date getDate1(String val) {
		Date date = null;
		
		try {
			date = formatter1.parse(val);
			
		}catch(Exception e){}
		return date;
	}
	/**
	 * Converts Date into String
	 * 
	 * @param date
	 * @return
	 */
	public static String getDateString(Date date) {
		
		try {
		   if(date!=null) {
				return formatter.format(date);
			}
			else{
				return "";
			}
		} catch (Exception e) {
			return "";
		}
		
	}
	
public static String getDateString1(Date date) {
		
		try {
		   if(date!=null) {
				return formatter1.format(date);
			}
			else{
				return "";
			}
		} catch (Exception e) {
			return "";
		}
		
	}

	/**
	 * Gets date after n number of days
	 * 
	 * @param date
	 * @param day
	 * @return
	 */
	public static Date getDate(Date date, int day) {
		return null;
	}

	/**
	 * Converts String into Time
	 * 
	 * @param cdt
	 * @return
	 */
	public static Timestamp getTimestamp(long l) {

		Timestamp timeStamp = null;
		try {
			timeStamp = new Timestamp(l);
		} catch (Exception e) {
			return null;
		}
		return timeStamp;
	}
	
	/**
	 * Converts String into Time
	 * 
	 * @param cdt
	 * @return
	 */
	public static Timestamp getTimestamp(String cdt) {

		Timestamp timeStamp = null;
		try {
		//	timeStamp = new Timestamp((timeFormatter.parse(cdt)).getTime());
		} catch (Exception e) {
			return null;
		}
		return timeStamp;
	}
	/**
	 * Converts Time into Long
	 * 
	 * @param tm
	 * @return
	 */
	public static long getTimestamp(Timestamp tm) {
		try {
			return tm.getTime();
		} catch (Exception e) {
			return 0;
		}
	}
	
	/**
	 * Provide Current time
	 * 
	 * 
	 * @return Time
	 */
	public static Timestamp getCurrentTimestamp() {
		Timestamp timeStamp = null;
		try {
			timeStamp = new Timestamp(new Date().getTime());
		} catch (Exception e) {
		}
		return timeStamp;

	}
	
	public static List<String> getDatesBetweenStartDateAndEndDate(Date startDate, Date endDate) {
		  List<String> datesInRange = new ArrayList<>();
		  Calendar calendar = getCalendarWithoutTime(startDate);
		  Calendar endCalendar = getCalendarWithoutTime(endDate);

		  endCalendar.add(Calendar.DATE, 1);
		  while (calendar.before(endCalendar)) {
		    Date result = calendar.getTime();
		    datesInRange.add(DataUtility.getDateString(result));
		    calendar.add(Calendar.DATE, 1);
		  }

		  return datesInRange;
		}

		private static Calendar getCalendarWithoutTime(Date date) {
		  Calendar calendar = new GregorianCalendar();
		  calendar.setTime(date);
		  calendar.set(Calendar.HOUR, 0);
		  calendar.set(Calendar.HOUR_OF_DAY, 0);
		  calendar.set(Calendar.MINUTE, 0);
		  calendar.set(Calendar.SECOND, 0);
		  calendar.set(Calendar.MILLISECOND, 0);
		  return calendar;
		}

	public static void main(String[] args)
	{
		DataUtility d=new DataUtility();
		
		Date date=new Date();
		//System.out.println(getDateString(date));
	
		//System.out.println(d.getCurrentTimestamp());
		/*
		 * String s1=""; System.out.println(getString("Ravi"));
		 * System.out.println(s1.isEmpty());
		 * System.out.println(getDate("21/01/1994")); System.out.println(new
		 * Date());
		 */
		//System.out.println(getDate("01/21/1998"));

		
		System.out.println(getDatesBetweenStartDateAndEndDate(DataUtility.getDate("2021-11-03"), DataUtility.getDate("2021-11-05")));
		
	//	List<String> datesBetweenStartDateAndEndDate = getDatesBetweenStartDateAndEndDate(DataUtility.getDate("11/03/2021"), DataUtility.getDate("11/05/2021"));
		
	
		//System.out.println(getDate("2022-11-03"));
		//System.out.println(DataUtility.getDateString(getDate("2022-11-03")));
	}

}

