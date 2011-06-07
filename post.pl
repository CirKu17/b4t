#!/usr/bin/env perl
   
use strict;
use warnings;
use Template;
use LWP::Simple;
use Regexp::Common qw /URI/;


@ARGV || die "Usage: post.pl <post.txt>" ;

my $post_txt = $ARGV[0]	;

open POST_TXT, "<$post_txt" or die $!;	# get content from txt file

my $timestamp;
my $title;
my @content;

	while (my $line = <POST_TXT>) {

		chomp($timestamp = $line ) if $. == 1 ; # the timestamp is the first line in the txt
		chomp($title = $line ) if $. == 2 ;		# the title is the second
		push(@content, $line ) if $. >2 ;		# the content is the rest
		
	}

close (POST_TXT);

my $content = join ("\t\t", @content ) ;

&links_to_cdata ;	# converting uri to CDATA clickable links

my $tt    = Template->new( );
my $input = 'post.tt';			# post.tt is the template file
my $output = 'post.xml' ;
my $vars  = {
    timestamp  => $timestamp ,
    title 	   => $title ,
    content    => $content ,
};
   
$tt->process($input, $vars, $output ) || die $tt->error( ) ;	# applying posts' template

open POST_XML, "post.xml" or die $!;		# get xml content of post

	my @post_xml_content ;

		while (my $line = <POST_XML>) {

			push(@post_xml_content, $line ) ;
		}

close (POST_XML);


open POST_DB, "+<post_db.xml" or die $!;	# placing post content in xml db

	my @lines = <POST_DB> ;
	splice @lines, 3, 0, @post_xml_content ;	# insert the new post after the first 3 lines

close (POST_DB);

open POST_DB, ">post_db.xml" or die $!;		# re-writing posts' xml db

	print POST_DB @lines ; 

close (POST_DB);

print "[*] Done\n" ;

exit(0) ;


sub links_to_cdata {

	my @links_raw ;

	while ($content =~ /($RE{URI}{HTTP})/g) {

		push ( @links_raw, $1 );

	}

	foreach my $link_raw (@links_raw) {

		my $html = get ($link_raw);
		  $html =~ m{<TITLE>(.*?)</TITLE>}gism;
		  my $title = $1;
            $title =~ s/\n//g; # remove newlines
            chomp $title;
            my $link_raw_escaped = quotemeta($link_raw);

		$content =~ s/$link_raw_escaped/\<!\[CDATA\[\<a\ href="$link_raw"\>$title\<\/a\>\ \]\]\>/g ;

	}

return $content ;

}

