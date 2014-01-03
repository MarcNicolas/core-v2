/***************************************
 * Copyright 2010, Aladin by the Centre de DonnÃ©es astronomiques de Strasbourg (CDS).
 * Copyright 2011, 2012 GlobWeb contributors.
 *
 * This file is part of GlobWeb.
 *
 * GlobWeb is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, version 3 of the License, or
 * (at your option) any later version.
 *
 * GlobWeb is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with GlobWeb. If not, see <http://www.gnu.org/licenses/>.
 ***************************************/

function ColorMap () {

/**************************************************************************************************************/
var transferFonctions = {
	"linear": [],
	"asin": [],
	"sqrt": [],
	"sqr": [],
	"log": []
};

var computeTransferFunctions = function() 
{

	for ( var x in transferFonctions)
	{
	    var min=Number.MAX_VALUE;
	    var max=Number.MIN_VALUE;
	    var v;
	    var val = [];
	    for( var i=0; i<256; i++ ) {
	      	v = i;
	      	switch( x ) {
	      		case "linear":
	      			val[i] = v;
	      			break;
	      		case "asin":
	      			val[i] = Math.log(v + Math.sqrt(Math.pow(v,2)+1.));
	      			break;
	      		case "log":
	      			val[i] = Math.log(v/10.+1);
	      			break;
	      		case "sqrt":
	      			val[i] = Math.sqrt(v/10.);
	      			break;
	      		case "sqr":
	      			val[i] = v*v;
	      			break;
	      		default:
	      			break;
	      	}
	      	 
	        if( val[i]<min ) min=val[i];
	        if( val[i]>max ) max=val[i];
	    }

	    // Normalize between [0..256]
	    for( i=0; i<256; i++ )
	    {
	    	v = 256 * ((val[i] - min)/(max-min));

	    	// Clamp
	        if( v>256. )
	        	v=256.;
	        else if( v<0. )
	        	v=0.;

	        transferFonctions[x][i] = Math.floor(v);
	    }
	}
}

computeTransferFunctions();

// Contstant colormaps
var colormaps = {
		// composantes de la table 'Fire' (ImageJ)
		"fire" : {
		    red: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,4,7,
			   10,13,16,19,22,25,28,31,34,37,40,43,46,49,52,55,58,61,64,67,70,73,76,79,
			   82,85,88,91,94,98,101,104,107,110,113,116,119,122,125,128,131,134,137,
			   140,143,146,148,150,152,154,156,158,160,162,163,164,166,167,168,170,171,
			   173,174,175,177,178,179,181,182,184,185,186,188,189,190,192,193,195,196,
			   198,199,201,202,204,205,207,208,209,210,212,213,214,215,217,218,220,221,
			   223,224,226,227,229,230,231,233,234,235,237,238,240,241,243,244,246,247,
			   249,250,252,252,252,253,253,253,254,254,255,255,255,255,255,255,255,255,
			   255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
			   255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
			   255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
			   255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
			   255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
			   255,255,255,255,255,255,255,255,255,255,255,255,255,255],

		    green: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			   0,0,0,0,0,0,1,3,5,7,8,10,12,14,16,19,21,24,27,29,32,35,37,40,43,46,48,
			   51,54,57,59,62,65,68,70,73,76,79,81,84,87,90,92,95,98,101,103,105,107,
			   109,111,113,115,117,119,121,123,125,127,129,131,133,134,136,138,140,141,
			   143,145,147,148,150,152,154,155,157,159,161,162,164,166,168,169,171,173,
			   175,176,178,180,182,184,186,188,190,191,193,195,197,199,201,203,205,206,
			   208,210,212,213,215,217,219,220,222,224,226,228,230,232,234,235,237,239,
			   241,242,244,246,248,248,249,250,251,252,253,254,255,255,255,255,255,255,
			   255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
			   255,255,255,255,255,255,255,255],

		    blue: [0,7,15,22,30,38,45,53,61,65,69,74,78,
			   82,87,91,96,100,104,108,113,117,121,125,130,134,138,143,147,151,156,160,
			   165,168,171,175,178,181,185,188,192,195,199,202,206,209,213,216,220,220,
			   221,222,223,224,225,226,227,224,222,220,218,216,214,212,210,206,202,199,
			   195,191,188,184,181,177,173,169,166,162,158,154,151,147,143,140,136,132,
			   129,125,122,118,114,111,107,103,100,96,93,89,85,82,78,74,71,67,64,60,56,
			   53,49,45,42,38,35,31,27,23,20,16,12,8,5,4,3,3,2,1,1,0,0,0,0,0,0,0,0,0,0,
			   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			   4,8,13,17,21,26,30,35,42,50,58,66,74,82,90,98,105,113,121,129,136,144,
			   152,160,167,175,183,191,199,207,215,223,227,231,235,239,243,247,251,255,
			   255,255,255,255,255,255,255]
		},

		// composantes de la table EOSB (IDL color table 27)
		"eosb" : {
			red: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			   0,0,0,0,0,0,0,0,0,0,0,0,0,9,18,27,36,45,49,57,72,81,91,100,109,118,127,
			   136,131,139,163,173,182,191,200,209,218,227,213,221,255,255,255,255,255,
			   255,255,255,229,229,255,255,255,255,255,255,255,255,229,229,255,255,255,
			   255,255,255,255,255,229,229,255,255,255,255,255,255,255,255,229,229,255,
			   255,255,255,255,255,255,255,229,229,255,255,255,255,255,255,255,255,229,
			   229,255,255,255,255,255,255,255,255,229,229,255,255,255,255,255,255,255,
			   255,229,229,255,255,255,255,255,255,255,255,229,229,255,253,251,249,247,
			   245,243,241,215,214,235,234,232,230,228,226,224,222,198,196,216,215,213,
			   211,209,207,205,203,181,179,197,196,194,192,190,188,186,184,164,162,178,
			   176,175,173,171,169,167,165,147,145,159,157,156,154,152,150,148,146,130,
			   128,140,138,137,135,133,131,129,127,113,111,121,119,117,117],

		   green: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,15,23,31,39,47,55,57,64,79,87,95,
			   103,111,119,127,135,129,136,159,167,175,183,191,199,207,215,200,207,239,
			   247,255,255,255,255,255,255,229,229,255,255,255,255,255,255,255,255,229,
			   229,255,255,255,255,255,255,255,255,229,229,255,250,246,242,238,233,229,
			   225,198,195,212,208,204,199,195,191,187,182,160,156,169,165,161,157,153,
			   148,144,140,122,118,127,125,123,121,119,116,114,112,99,97,106,104,102,
			   99,97,95,93,91,80,78,84,82,80,78,76,74,72,70,61,59,63,61,59,57,55,53,50,
			   48,42,40,42,40,38,36,33,31,29,27,22,21,21,19,16,14,12,13,8,6,3,1,0,0,0,
			   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

		   blue: [116,121,127,131,136,140,144,148,153,
			   157,145,149,170,174,178,182,187,191,195,199,183,187,212,216,221,225,229,
			   233,238,242,221,225,255,247,239,231,223,215,207,199,172,164,175,167,159,
			   151,143,135,127,119,100,93,95,87,79,71,63,55,47,39,28,21,15,7,0,0,0,0,0,
			   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			   0,0,0,0,0,0,0]
		},

		// tableau des composantes pour Stern
		"stern" : {
	   	red: [0,18,36,54,72,90,108,127,145,163,199,217,235,
	         254,249,244,239,234,229,223,218,213,208,203,197,192,187,182,177,172,
	         161,156,151,146,140,135,130,125,120,115,109,104,99,94,89,83,78,73,68,
	         63,52,47,42,37,32,26,21,16,11,6,64,65,66,67,68,69,70,71,72,73,75,76,
	         77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,96,97,98,99,100,
	         101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,117,118,
	         119,120,121,122,123,124,125,126,128,129,130,131,132,133,134,135,136,
	         137,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,
	         155,156,157,158,160,161,162,163,164,165,166,167,168,169,170,171,172,
	         173,174,175,176,177,178,179,181,182,183,184,185,186,187,188,189,190,
	         192,193,194,195,196,197,198,199,200,201,203,204,205,206,207,208,209,
	         210,211,212,213,214,215,216,217,218,219,220,221,222,224,225,226,227,
	         228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,245,
	         246,247,248,249,250,251,252,253,254],

   		green: [0,1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,
	         19,20,21,22,23,24,25,26,27,28,29,30,32,33,34,35,36,37,38,39,40,41,42,
	         43,44,45,46,47,48,49,50,51,53,54,55,56,57,58,59,60,61,62,64,65,66,67,
	         68,69,70,71,72,73,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,
	         92,93,94,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,
	         112,113,114,115,117,118,119,120,121,122,123,124,125,126,128,129,130,
	         131,132,133,134,135,136,137,139,140,141,142,143,144,145,146,147,148,
	         149,150,151,152,153,154,155,156,157,158,160,161,162,163,164,165,166,
	         167,168,169,170,171,172,173,174,175,176,177,178,179,181,182,183,184,
	         185,186,187,188,189,190,192,193,194,195,196,197,198,199,200,201,203,
	         204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,
	         221,222,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,
	         239,240,241,242,243,245,246,247,248,249,250,251,252,253,254],

   		blue : [0,1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,
	         35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,
	         83,85,87,89,91,93,95,97,99,101,105,107,109,111,113,115,117,119,121,
	         123,127,129,131,133,135,137,139,141,143,145,149,151,153,155,157,159,
	         161,163,165,167,169,171,173,175,177,179,181,183,185,187,191,193,195,
	         197,199,201,203,205,207,209,211,213,215,217,219,221,223,225,227,229,
	         233,235,237,239,241,243,245,247,249,251,255,251,247,243,238,234,230,
	         226,221,217,209,204,200,196,192,187,183,179,175,170,166,162,158,153,
	         149,145,141,136,132,128,119,115,111,107,102,98,94,90,85,81,77,73,68,
	         64,60,56,51,47,43,39,30,26,22,17,13,9,5,0,3,7,15,19,22,26,30,34,38,41,
	         45,49,57,60,64,68,72,76,79,83,87,91,95,98,102,106,110,114,117,121,125,
	         129,137,140,144,148,152,156,159,163,167,171,175,178,182,186,190,194,
	         197,201,205,209,216,220,224,228,232,235,239,243,247,251]
		},

		// composantes de la table rainbow (IDL color table 13)
		"rainbow": {
			red : [0,4,9,13,18,22,27,31,36,40,45,50,54,
			   58,61,64,68,69,72,74,77,79,80,82,83,85,84,86,87,88,86,87,87,87,85,84,84,
			   84,83,79,78,77,76,71,70,68,66,60,58,55,53,46,43,40,36,33,25,21,16,12,4,0,
			   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,8,12,21,25,29,33,42,
			   46,51,55,63,67,72,76,80,89,93,97,101,110,114,119,123,131,135,140,144,153,
			   157,161,165,169,178,182,187,191,199,203,208,212,221,225,229,233,242,246,
			   250,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
			   255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
			   255,255,255,255,255,255,255,255,255,255,255,255,255,255],
   		green : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			   0,0,0,0,0,0,0,0,4,8,16,21,25,29,38,42,46,51,55,63,67,72,76,84,89,93,97,
			   106,110,114,119,127,131,135,140,144,152,157,161,165,174,178,182,187,195,
			   199,203,208,216,220,225,229,233,242,246,250,255,255,255,255,255,255,255,
			   255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
			   255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
			   255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
			   255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
			   255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
			   255,250,242,238,233,229,221,216,212,208,199,195,191,187,178,174,170,165,
			   161,153,148,144,140,131,127,123,119,110,106,102,97,89,85,80,76,72,63,59,
			   55,51,42,38,34,29,21,17,12,8,0],
   		blue : [0,3,7,10,14,19,23,28,32,38,43,48,53,
			   59,63,68,72,77,81,86,91,95,100,104,109,113,118,122,127,132,136,141,145,
			   150,154,159,163,168,173,177,182,186,191,195,200,204,209,214,218,223,227,
			   232,236,241,245,250,255,255,255,255,255,255,255,255,255,255,255,255,255,
			   255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
			   255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
			   255,255,255,255,255,255,246,242,238,233,225,220,216,212,203,199,195,191,
			   187,178,174,170,165,157,152,148,144,135,131,127,123,114,110,106,102,97,
			   89,84,80,76,67,63,59,55,46,42,38,34,25,21,16,12,8,0,0,0,0,0,0,0,0,0,0,0,
			   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
		},

		// Simple grey levels
		"grey": {
			red : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,
		     19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,
		     43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,
		     68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,
		     92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,
		     112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,
		     131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,
		     149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,
		     167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,
		     185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,
		     204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,
		     221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,
		     239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255],
     	green: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,
		     19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,
		     43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,
		     68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,
		     92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,
		     112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,
		     131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,
		     149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,
		     167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,
		     185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,
		     204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,
		     221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,
		     239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255],
     	blue: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,
		     19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,
		     43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,
		     68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,
		     92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,
		     112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,
		     131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,
		     149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,
		     167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,
		     185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,
		     204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,
		     221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,
		     239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255]
	}
}

/**
 *	Create texture from array
 *	TODO : maybe move this function to renderContext ?
 *
 *	@param gl Context
 *	@param dataArray Array creating the texture
 *	@param format Content format(gl.LUMINANCE, gl.RGB...)
 *	@param dataType Type of data(gl.UNSIGNED_BYTE or gl.FLOAT)
 *	@param width Width of texture
 *	@param height Height of texture
 *
 *	@return GLTexture, or null caused by not supported format
 */
function _textureFromPixelArray(gl, dataArray, format, dataType, width, height) {
	var dataTypedArray;
//	dataTypedArray = new Float32Array(dataArray, width, height);
	dataTypedArray = new Uint8Array(dataArray);
	
//	dataTypedArray = this.jsFits.ctx.createImageData(this.width, this.height);
	
//	dataTypedArray = new Float32Array(dataArray);
//	if ( dataType == gl.UNSIGNED_BYTE )
//    	dataTypedArray = new Uint8Array(dataArray);
//    else if ( dataType == gl.FLOAT )
//    else
//    	return null;

//    var texture = gl.createTexture();
//    gl.bindTexture(gl.TEXTURE_2D, texture);
//    gl.texImage2D(gl.TEXTURE_2D, 0, format, width, height, 0, format, dataType, dataTypedArray);
//
//    // NPOT properties
//    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
//	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
//	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
//	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

	return dataTypedArray;
//    return texture;
}

return {

	/**
	 * Generate colormap
	 */
	generateColormap : function(gl, transferFonction, colormap, inverse)
	{
		// var pas1 = 128./(tr1-tr0);
	  	// var pas2 = 128./(tr2-tr1);
		
		// Get transfer function
		var fctGap = transferFonctions[transferFonction];

		var cm = [];

		var Sr, Sg, Sb;
		Sr = colormaps[colormap].red;
		Sg = colormaps[colormap].green;
		Sb = colormaps[colormap].blue;
		var max = Sr.length-1;
	  	for( var i=0; i<256; i++ ) {
	     	// int j= i<tr0 ? 0 :
	      //       i<tr1 ? (int)Math.round((i-tr0)*pas1) :
	      //       i<tr2 ? 128+(int)Math.round((i-tr1)*pas2) :
	      //               max;

	     	var j = fctGap[i];

	     	// Clamp
	     	if( j>max ) j=max;
	     		else if( j<0 ) j=0;
	     	if( inverse ) j=max-j;

	     	// Normalize between [0..1]
	     	cm[i*3] = Sr[j] / 256.;
	     	cm[i*3+1] = Sg[j] / 256.;
	     	cm[i*3+2] = Sb[j] / 256.;
	  }

	    // Create new texture
//	  	return _textureFromPixelArray(gl, cm, gl.RGB, gl.FLOAT, cm.length/3, 1);
		return _textureFromPixelArray(gl, cm, null, null, cm.length/3, 1);
	}

}

};